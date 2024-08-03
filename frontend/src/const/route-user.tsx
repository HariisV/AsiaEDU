import { Route } from 'react-router-dom';

import Profile from '@/pages/profile';
import KelasDetail from '@/pages/user/kelas-detail';
import AllClass from '@/pages/user/semua-kelas';
import HomePage from '@/pages/user/home';

export const userRoutes = [
  <Route path="/profile" element={<Profile />} />,
  <Route path="/home" element={<HomePage />} />,
  <Route path="/kelas/:id" element={<KelasDetail />} />,
  <Route path="/semua-kelas" element={<AllClass />} />,
];
