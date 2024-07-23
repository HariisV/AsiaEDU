const Joi = require('joi');
const moment = require('moment');
const excelJS = require('exceljs');
const { default: readXlsxFile } = require('read-excel-file/node');
const fs = require('fs');

const database = require('#database');
const { returnPagination } = require('#utils');
const { BadRequestError } = require('#errors');

const convertNumToStr = (index) => {
  return String.fromCharCode(65 + index);
};

const insert = async (req, res, next) => {
  try {
    const schema = Joi.object({
      categoryId: Joi.number().required(),
      soal: Joi.string().required(),
      pembahasan: Joi.string(),
      jawaban: Joi.array().items(Joi.object()).required(),
      subCategory: Joi.string(),
    });

    const validate = await schema.validateAsync(req.body);

    const checkCategory = await database.bankSoalCategory.findUnique({
      where: {
        id: validate.categoryId,
      },
    });

    if (!checkCategory) throw new BadRequestError('Kategori tidak ditemukan');

    if (validate.jawaban.length < 1)
      throw new BadRequestError('Jawaban tidak boleh kosong');

    if (validate.jawaban.filter((item) => item.isCorrect).length < 1)
      throw new BadRequestError('Jawaban benar tidak boleh kosong');

    if (validate.jawaban.filter((item) => item.isCorrect).length > 1)
      throw new BadRequestError('Jawaban benar hanya boleh 1');

    const soal = await database.bankSoal.create({
      data: {
        soal: validate.soal,
        pembahasan: validate.pembahasan,
        subCategory: validate.subCategory,
        category: {
          connect: {
            id: validate.categoryId,
          },
        },
      },
    });

    await database.bankSoalSubCategory.upsert({
      where: {
        value: validate.subCategory,
      },
      create: {
        value: validate.subCategory,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    const createData = validate.jawaban.map((item) => {
      return item.isDeleted || !item.value
        ? null
        : {
            jawaban: item.value,
            isCorrect: item.isCorrect,
            point: item.point,
            bankSoalId: soal.id,
          };
    });
    await database.bankSoalJawaban.createMany({
      data: createData.filter((item) => item),
    });

    const result = await database.bankSoal.findUnique({
      where: {
        id: soal.id,
      },
      select: {
        id: true,
        soal: true,
        pembahasan: true,
        BankSoalJawaban: {
          select: {
            id: true,
            jawaban: true,
            isCorrect: true,
            point: true,
          },
        },
      },
    });

    res.status(200).json({
      data: result,
      msg: 'Berhasil menambahkan Bank Soal',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const schema = Joi.object({
      soal: Joi.string().required(),
      pembahasan: Joi.string(),
      jawaban: Joi.array().items(Joi.object()).required(),
      categoryId: Joi.number().required(),
      subCategory: Joi.string(),
    });

    const validate = await schema.validateAsync(req.body);

    if (validate.jawaban.length < 1)
      throw new BadRequestError('Jawaban tidak boleh kosong');

    const correctAnswersCount = validate.jawaban.filter(
      (item) => item.isCorrect && !item.isDeleted
    ).length;

    if (correctAnswersCount < 1)
      throw new BadRequestError('Jawaban benar tidak boleh kosong');
    if (correctAnswersCount > 1)
      throw new BadRequestError('Jawaban benar hanya boleh 1');

    const isExist = await database.bankSoal.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!isExist) throw new BadRequestError('Soal tidak ditemukan');

    await database.bankSoalSubCategory.upsert({
      where: {
        value: validate.subCategory,
      },
      create: {
        value: validate.subCategory,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    const result = await database.bankSoal.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        soal: validate.soal,
        pembahasan: validate.pembahasan,
        subCategory: validate.subCategory,
      },
    });

    const updateJawaban = validate.jawaban.map((item) => {
      return !item.isDeleted && item.isUpdate
        ? {
            id: item.id,
            isCorrect: item.isCorrect,
            jawaban: item.value,
            point: item.point,
            bankSoalId: result.id,
          }
        : null;
    });
    const createJawaban = validate.jawaban.map((item) => {
      return !item.isDeleted && !item.isUpdate
        ? {
            isCorrect: item.isCorrect,
            jawaban: item.value,
            point: item.point,
            bankSoalId: result.id,
          }
        : null;
    });

    const deleteJawaban = validate.jawaban.map((item) => {
      return item.isDeleted && item.isUpdate ? item.id : null;
    });
    await database.bankSoalJawaban.deleteMany({
      where: {
        id: {
          in: deleteJawaban.filter((item) => item),
        },
      },
    });
    updateJawaban.forEach(async (item) => {
      if (item != null) {
        await database.bankSoalJawaban.update({
          where: {
            id: item.id,
          },
          data: {
            isCorrect: item.isCorrect,
            jawaban: item.value,
            point: item.point,
          },
        });
      }
    });

    await database.bankSoalJawaban.createMany({
      data: createJawaban.filter((item) => item != null),
    });

    const jawaban = await database.bankSoalJawaban.findMany({
      where: {
        bankSoalId: result.id,
      },
    });

    res.status(200).json({
      data: { ...result, jawaban },
      msg: 'Berhasil mengubah bank soal',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.params);

    const isExist = await database.bankSoal.findUnique({
      where: {
        id: validate.id,
      },
    });

    if (!isExist) throw new BadRequestError('Soal tidak ditemukan');

    const result = await database.bankSoal.delete({
      where: {
        id: validate.id,
      },
    });

    res.status(200).json({
      data: result,
      msg: 'Berhasil menghapus bank soal',
    });
  } catch (error) {
    next(error);
  }
};

const getSubCategory = async (req, res, next) => {
  try {
    const schema = Joi.object({
      skip: Joi.number(),
      take: Joi.number(),
      sortBy: Joi.string(),
    }).unknown(true);

    const validate = await schema.validateAsync(req.query);

    const result = await database.$transaction([
      database.bankSoalSubCategory.findMany({
        skip: validate.skip,
        take: validate.take,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      database.bankSoalSubCategory.count({}),
    ]);

    return returnPagination(req, res, result);
  } catch (error) {
    next(error);
  }
};

const excel = async (req, res, next) => {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('BankSoal');

    const BankSoal = await database.bankSoal.findMany({
      where: {
        categoryId: Number(req.params.id),
      },

      include: {
        BankSoalJawaban: {
          select: {
            id: true,
            jawaban: true,
            isCorrect: true,
            point: true,
          },
        },
      },
    });

    worksheet.columns = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Sub Category', key: 'subCategory', width: 15 },
      { header: 'Soal', key: 'soal', width: 15 },
      { header: 'A', key: 'a', width: 15 },
      { header: 'Point A', key: 'pointA', width: 8 },
      { header: 'B', key: 'b', width: 15 },
      { header: 'Point B', key: 'pointB', width: 8 },
      { header: 'C', key: 'c', width: 15 },
      { header: 'Point C', key: 'pointC', width: 8 },
      { header: 'D', key: 'd', width: 15 },
      { header: 'Point D', key: 'pointD', width: 8 },
      { header: 'E', key: 'e', width: 15 },
      { header: 'Point E', key: 'pointE', width: 8 },
      { header: 'Pembahasan', key: 'pembahasan', width: 15 },
      { header: 'Jawaban Benar', key: 'jawabanBenar', width: 15 },
      { header: 'Ditambahkan', key: 'createdAt', width: 25 },
    ];
    BankSoal.forEach((item, index) => {
      const jawabanBenar = item?.BankSoalJawaban?.find(
        (jawaban, indexJawaban) => {
          jawaban.indexJawaban = indexJawaban;
          return jawaban.isCorrect;
        }
      );
      worksheet.addRow({
        ...item,
        no: index + 1,
        subCategory: item.subCategory || ' ',
        a: item.BankSoalJawaban?.[0]?.jawaban || ' ',
        b: item.BankSoalJawaban?.[1]?.jawaban || ' ',
        c: item.BankSoalJawaban?.[2]?.jawaban || ' ',
        d: item.BankSoalJawaban?.[3]?.jawaban || ' ',
        e: item.BankSoalJawaban?.[4]?.jawaban || ' ',
        pointA: item.BankSoalJawaban?.[0]?.point,
        pointB: item.BankSoalJawaban?.[1]?.point,
        pointC: item.BankSoalJawaban?.[2]?.point,
        pointD: item.BankSoalJawaban?.[3]?.point,
        pointE: item.BankSoalJawaban?.[4]?.point,
        jawabanBenar: jawabanBenar
          ? convertNumToStr(jawabanBenar.indexJawaban)
          : ' ',
        createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

    workbook.xlsx.write(res).then(() => res.end());
  } catch (error) {
    next(error);
  }
};

const importExcel = async (req, res, next) => {
  try {
    const exFile = `${__dirname}/../../../${req.file.path}`;
    const error = [];

    await readXlsxFile(fs.createReadStream(exFile)).then(async (rows) => {
      rows.shift();

      await rows.forEach(async (row, index) => {
        const [, soal, , , , , , , , , , , , jawabanBenar] = row;
        if (!soal)
          return error.push(`Nomor ${index + 1},  Soal tidak boleh kosong`);

        if (!jawabanBenar)
          return error.push(`Nomor ${index + 1},  Jawaban Harus di isi`);

        if (
          jawabanBenar != 'A' &&
          jawabanBenar != 'B' &&
          jawabanBenar != 'C' &&
          jawabanBenar != 'D' &&
          jawabanBenar != 'E'
        ) {
          return error.push(
            `Nomor ${
              index + 1
            },  Jawaban Benar harus di isi dengan A, B, C, D, atau E`
          );
        }
      });

      if (error.length > 0) return false;

      await rows.forEach(async (row) => {
        const [
          subCategory,
          soal,
          a,
          pointA,
          b,
          pointB,
          c,
          pointC,
          d,
          pointD,
          e,
          pointE,
          pembahasan,
          jawabanBenar,
        ] = row;

        const jawaban = [];
        if (a)
          jawaban.push({
            jawaban: a.toString(),
            point: pointA,
            isCorrect: jawabanBenar === 'A',
          });
        if (b)
          jawaban.push({
            jawaban: b.toString(),
            point: pointB,
            isCorrect: jawabanBenar === 'B',
          });
        if (c)
          jawaban.push({
            jawaban: c.toString(),
            point: pointC,
            isCorrect: jawabanBenar === 'C',
          });

        if (d)
          jawaban.push({
            jawaban: d.toString(),
            point: pointD,
            isCorrect: jawabanBenar === 'D',
          });

        if (e)
          jawaban.push({
            jawaban: e.toString(),
            point: pointE,
            isCorrect: jawabanBenar === 'E',
          });

        await database.bankSoal.create({
          data: {
            soal,
            pembahasan,
            subCategory,
            categoryId: Number(req.params.id),
            BankSoalJawaban: {
              create: jawaban,
            },
          },
        });
      });
    });

    if (error.length > 0) {
      return res.status(400).json({
        error,
        msg: 'Gagal import data',
      });
    }

    return res.status(200).json({
      msg: 'Berhasil import data',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insert,
  update,
  excel,
  remove,
  getSubCategory,
  importExcel,
};
