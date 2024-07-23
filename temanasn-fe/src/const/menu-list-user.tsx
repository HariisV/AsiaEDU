import { IconBuildingStore, IconHome2 } from '@tabler/icons-react';

const menuList = [
  {
    title: 'Home',
    pages: [
      {
        icon: <IconHome2 />,
        title: 'Home',
        link: '/',
      },

      {
        icon: <IconBuildingStore />,
        title: 'Kelas',
        link: '/classes',
        count: 'pembelian',
      },
    ],
  },
];

export default menuList;
