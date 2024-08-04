import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HomeProps {
  setData: (data: []) => void;
  section?: [];
  users?: number;
  kelas?: number;
  artikel?: number;
  komentar?: number;
}

export const useHomeStore = create<HomeProps>()(
  persist(
    (set) => ({
      setData: (props: any) => {
        set({
          users: props.users,
          komentar: props.komentar,
          kelas: props.kelas,
          artikel: props.artikel,
          section: props.section,
        });
      },
    }),
    { name: 'homepage' }
  )
);

export const getAllState = () => useHomeStore.getState();
