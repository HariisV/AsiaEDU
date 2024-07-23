import { Route } from 'react-router-dom';

import HomeUser from '@/pages/user/home';
import Profile from '@/pages/profile';
import KelasDetail from '@/pages/user/kelas-detail';
import AllClass from '@/pages/user/semua-kelas';

export const userRoutes = [
  <Route path="/" element={<HomeUser />} />,
  <Route path="/profile" element={<Profile />} />,
  <Route path="/kelas/:id" element={<KelasDetail />} />,
  <Route path="/classes" element={<AllClass />} />,
];
