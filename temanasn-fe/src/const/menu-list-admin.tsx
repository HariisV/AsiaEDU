import {
  IconDeviceAnalytics,
  IconIcons,
  IconNotebook,
  IconUsersGroup,
} from '@tabler/icons-react';

const menuList = [
  {
    title: 'Main',
    pages: [
      {
        icon: <IconDeviceAnalytics />,
        title: 'Dashboard',
        link: '/dashboard',
      },
      {
        icon: <IconIcons />,
        title: 'Home Page',
        link: '/manage-home-section',
      },
    ],
  },
  {
    title: 'Master',
    pages: [
      {
        icon: <IconNotebook />,
        title: 'Kelas',
        link: '/manage-kelas',
      },
      {
        icon: <IconUsersGroup />,
        title: 'User',
        link: '/manage-user',
      },
    ],
  },
];

export default menuList;
