const Joi = require('joi');

const database = require('#database');
const { returnPagination, deleteFile, filterToJson } = require('#utils');
const { BadRequestError } = require('#errors');

const getMyClass = async (req, res, next) => {
  try {
    const schema = Joi.object({
      skip: Joi.number(),
      take: Joi.number(),
      sortBy: Joi.string(),
      descending: Joi.boolean(),
      filters: Joi.object(),
    });

    const validate = await schema.validateAsync(req.query);

    const result = await database.$transaction([
      database.kelas.findMany({
        skip: validate.skip,
        take: validate.take,
        orderBy: {
          [validate.sortBy]: validate.descending ? 'desc' : 'asc',
        },
        where: {
          ...filterToJson(validate),
          kelasUser: {
            some: {
              userId: req.user.id,
            },
          },
        },
        select: {
          id: true,
          name: true,
          gambar: true,
          _count: {
            select: {
              kelasUser: {
                where: {
                  userId: req.user.id,
                },
              },
            },
          },
        },
      }),
      database.kelas.count({
        where: {
          ...filterToJson(validate),
          kelasUser: {
            some: {
              userId: req.user.id,
            },
          },
        },
      }),
    ]);

    return returnPagination(req, res, result);
  } catch (error) {
    next(error);
  }
};
const get = async (req, res, next) => {
  try {
    const schema = Joi.object({
      skip: Joi.number(),
      take: Joi.number(),
      sortBy: Joi.string(),
      descending: Joi.boolean(),
      filters: Joi.object(),
    });

    const validate = await schema.validateAsync(req.query);

    const result = await database.$transaction([
      database.kelas.findMany({
        skip: validate.skip,
        take: validate.take,
        orderBy: {
          [validate.sortBy]: validate.descending ? 'desc' : 'asc',
        },
        where: {
          ...filterToJson(validate),
        },
        select: {
          id: true,
          name: true,
          gambar: true,
          _count: {
            select: {
              kelasUser: {
                where: {
                  userId: req.user.id,
                },
              },
            },
          },
        },
      }),
      database.kelas.count({
        where: {
          ...filterToJson(validate),
        },
      }),
    ]);

    return returnPagination(req, res, result);
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.params);

    const result = await database.kelas.findUnique({
      where: {
        id: validate.id,
      },
    });

    if (!result) throw new BadRequestError('kelas tidak ditemukan');

    res.status(200).json({
      data: result,
      msg: 'Get data by id',
    });
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const schema = Joi.object({
      gambar: Joi.string().required(),
      name: Joi.string().required(),
    });

    const validate = await schema.validateAsync({
      ...req.body,
      gambar: req?.file?.path,
    });

    const result = await database.kelas.create({
      data: validate,
    });

    res.status(200).json({
      data: result,
      msg: 'Berhasil menambahkan kelas',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const schema = Joi.object({
      gambar: Joi.string(),
      name: Joi.string().required(),
      id: Joi.number().required(),
    });

    const validate = await schema.validateAsync(
      {
        ...req.params,
        ...req.body,
        gambar: req?.file?.path,
      },
      {
        stripUnknown: true,
      }
    );

    const isExist = await database.kelas.findUnique({
      where: {
        id: validate.id,
      },
    });

    if (!isExist) throw new BadRequestError('kelas tidak ditemukan');

    const result = await database.kelas.update({
      where: {
        id: validate.id,
      },
      data: validate,
    });

    if (validate.gambar) deleteFile(isExist.gambar);

    res.status(200).json({
      data: result,
      msg: 'Berhasil mengubah data kelas',
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

    const isExist = await database.kelas.findUnique({
      where: {
        id: validate.id,
      },
    });

    if (!isExist) throw new BadRequestError('kelas tidak ditemukan');

    const result = await database.kelas.delete({
      where: {
        id: validate.id,
      },
    });

    res.status(200).json({
      data: result,
      msg: 'Berhasil menghapus data kelas',
    });
  } catch (error) {
    next(error);
  }
};

const join = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.body);

    const isExist = await database.kelas.findUnique({
      where: {
        id: validate.id,
      },
    });

    if (!isExist) throw new BadRequestError('kelas tidak ditemukan');

    let result = await database.kelasUser.findFirst({
      where: {
        kelasId: validate.id,
        userId: req.user.id,
      },
    });

    if (!result) {
      result = await database.kelasUser.create({
        data: {
          kelasId: validate.id,
          userId: req.user.id,
        },
      });
    }

    res.status(200).json({
      data: result,
      msg: 'Berhasil join kelas',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  find,
  insert,
  update,
  join,
  remove,
  getMyClass,
};
