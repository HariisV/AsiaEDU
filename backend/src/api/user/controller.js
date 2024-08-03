const Joi = require('joi');
const bcrypt = require('bcryptjs');
const database = require('#database');
const { BadRequestError } = require('#errors');
const { generateToken, deleteFile } = require('#utils');

const changeProfile = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      noWA: Joi.string().required(),
      gambar: Joi.string(),
    }).unknown(true);

    const validate = await schema.validateAsync({
      ...req.body,
      gambar: req.file?.path,
    });

    const isExist = await database.user.findUnique({
      where: {
        id: req?.user?.id,
      },
    });

    if (!isExist) throw new BadRequestError('User tidak ditemukan');

    if (req?.file?.path && isExist.gambar !== 'public/DEFAULT_USER.png') {
      deleteFile(isExist.banner);
    }

    const result = await database.user.update({
      where: {
        id: req?.user?.id,
      },
      data: {
        name: validate.name,
        noWA: validate.noWA,
        // alamat: validate.alamat,
        // provinsi: validate.provinsi,
        // kabupaten: validate.kabupaten,
        // kecamatan: validate.kecamatan,
        // gambar: validate.gambar || isExist.gambar,
      },
    });

    const token = generateToken(result);

    res.status(200).json({
      data: {
        token,
        user: result,
      },

      msg: 'Berhasil mengubah profile',
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const schema = Joi.object({
      password: Joi.string().min(8).required(),
      oldPassword: Joi.string().min(8).required(),
    });

    const validate = await schema.validateAsync(req.body);

    const user = await database.user.findUnique({
      where: {
        id: req?.user?.id,
      },
    });

    if (!user) throw new BadRequestError('User tidak ditemukan');

    const checkPassword = bcrypt.compareSync(
      validate.oldPassword,
      user.password
    );

    if (!checkPassword) throw new BadRequestError('Password lama salah');

    const hashPassword = bcrypt.hashSync(validate.password, 10);

    const result = await database.user.update({
      where: {
        id: req?.user?.id,
      },
      data: {
        password: hashPassword,
      },
    });

    res.status(200).json({
      data: result,
      msg: 'Berhasil mengubah password',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  changeProfile,
  changePassword,
};
