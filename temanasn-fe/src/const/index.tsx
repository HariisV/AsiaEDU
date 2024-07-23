export { default as routes } from './routes';
export { default as menuListUser } from './menu-list-user';
export { default as menuListAdmin } from './menu-list-admin';

export const SERVER_URL_API = 'https://bimbel.viracun.id/server/api';
export const SERVER_URL = 'https://bimbel.viracun.id/server/';
export const FRONTEND_URL = 'https://bimbel.viracun.id';

// export const SERVER_URL_API = 'http://localhost:8001/api';
// export const SERVER_URL = 'http://localhost:8001';
// export const FRONTEND_URL = 'http://localhost:5173';

export { adminRoutes } from './route-admin';

export const countDiscount = (
  type: string,
  price: number,
  discount: number
) => {
  if (type === 'PERSEN') {
    return price * (discount / 100);
  } else {
    return discount;
  }
};

export const handleOpenLink = (link: string) => {
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'https://' + link;
  }

  // Membuka link dalam jendela baru
  return window.open(link, '_blank');
};

export const hitungJumlahBankSoal = (data: any) => {
  let totalBankSoal = 0;

  if (data && data.PaketLatihan && data.PaketLatihan.PaketLatihanSoal) {
    const paketLatihanSoal = data.PaketLatihan.PaketLatihanSoal;

    paketLatihanSoal.forEach((item: any) => {
      if (
        item &&
        item.bankSoalCategory &&
        item.bankSoalCategory._count &&
        item.bankSoalCategory._count.BankSoal
      ) {
        totalBankSoal += item.bankSoalCategory._count.BankSoal;
      }
    });
  } else if (data && data.PaketLatihanSoal) {
    const paketLatihanSoal = data.PaketLatihanSoal;

    paketLatihanSoal.forEach((item: any) => {
      if (
        item &&
        item.bankSoalCategory &&
        item.bankSoalCategory._count &&
        item.bankSoalCategory._count.BankSoal
      ) {
        totalBankSoal += item.bankSoalCategory._count.BankSoal;
      }
    });
  }

  return totalBankSoal;
};

export const konversiDetikKeWaktu = (detik: any) => {
  if (!detik) return '00:00';
  // Menghitung jam, menit, dan detik
  let jam: string = Math.floor(detik / 3600).toString();
  const sisaDetik = detik % 3600;
  let menit: string = Math.floor(sisaDetik / 60).toString();
  let detikSisa: string = Number(sisaDetik % 60).toString();

  // Menambahkan "0" di depan angka jika kurang dari 10
  jam = jam.length < 2 ? `0${jam}` : jam;
  menit = menit.length < 2 ? `0${menit}` : menit.toString();
  detikSisa = detikSisa.length < 2 ? `0${detikSisa}` : detikSisa.toString();

  // Membuat format waktu
  let formatWaktu = '';
  if (jam > '0') {
    formatWaktu += jam + ':';
  }
  formatWaktu += menit + ':' + detikSisa;

  return formatWaktu;
};
