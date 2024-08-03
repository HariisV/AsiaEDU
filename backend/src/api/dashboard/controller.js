const database = require('#database');

const admin = async (req, res, next) => {
  try {
    const users = await database.user.count();
    const kelas = await database.kelas.count();
    const artikel = await database.KelasArticle.count();
    const komentar = await database.KelasArticleComment.count();

    const get5User = await database.user.findMany({
      skip: 0,
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const get5Pembelian = [];

    return res.status(200).json({
      status: 'success',
      data: {
        user: users,
        kelas,
        komentar,
        artikel,
        users: get5User,
        pembelians: get5Pembelian,
      },
    });
  } catch (error) {
    next(error);
  }
};

const user = async (req, res, next) => {
  try {
    const users = await database.user.count();
    const kelas = await database.kelas.count();
    const artikel = await database.KelasArticle.count();
    const komentar = await database.KelasArticleComment.count();

    const section = await database.homeSection.findMany({});

    return res.status(200).json({
      status: 'success',
      data: {
        users,
        kelas,
        komentar,
        artikel,
        section,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  admin,
  user,
};
