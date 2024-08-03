import { IconBuildingStore, IconHome2 } from '@tabler/icons-react';

const menuList = [
  {
    title: 'Home',
    pages: [
      {
        icon: <IconHome2 />,
        title: 'Home',
        link: '/home',
      },

      {
        icon: <IconBuildingStore />,
        title: 'Kelas',
        link: '/semua-kelas',
      },
    ],
  },
];

export default menuList;
