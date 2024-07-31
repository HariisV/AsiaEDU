import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HomeProps {
  setData: (data: []) => void;
  section?: [];
  users?: number;
  notifikasi?: [];
  kelas?: number;
}

export const useHomeStore = create<HomeProps>()(
  persist(
    (set) => ({
      setData: (props: any) => {
        set({
          users: props.users,
          kelas: props.kelas,
          section: props.section,
          notifikasi: props.notifikasi,
        });
      },
    }),
    { name: 'homepage' }
  )
);

export const getAllState = () => useHomeStore.getState();
