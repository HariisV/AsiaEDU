export { default as routes } from './routes';
export { default as menuListUser } from './menu-list-user';
export { default as menuListAdmin } from './menu-list-admin';

export const SERVER_URL = 'https://asiaedu-api.haris.my.id';
// export const SERVER_URL = 'http://localhost:8001';

export const SERVER_URL_API = `${SERVER_URL}/api`;

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
