const database = require('#database');

const admin = async (req, res, next) => {
  try {
    const user = await database.user.count();
    // const pembelian = await database.pembelian.count();
    // const soal = await database.bankSoal.count();
    // const voucher = await database.voucher.count();
    // const event = await database.event.count();

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
        user,
        pembelian: 5,
        soal: 5,
        voucher: 5,
        event: 5,
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
    // const pembelian = await database.paketPembelian.count();
    // const soal = await database.bankSoal.count();
    // const event = await database.event.count();

    const section = await database.homeSection.findMany({});

    // SYSTEM
    // USER

    return res.status(200).json({
      status: 'success',
      data: {
        users,
        kelas,
        // pembelian,
        // soal,
        // event,
        section,
        // notifikasi,
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
