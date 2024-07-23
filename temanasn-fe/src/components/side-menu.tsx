import { menuListUser, menuListAdmin } from '@/const';
import { useAuthStore } from '@/stores/auth-store';
import { checkRouteActive } from '@/utils';

import LOGO from '@/assets/Logo.png';

import { IconBook2 } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

type MenuItem = {
  link: string;
  title: string;
  icon: JSX.Element;
};

export default function SideMenu({ classNames }: any) {
  const myClass = useAuthStore((state) => state.myClass);
  const account = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const menuList =
    account?.role === 'USER'
      ? menuListUser
      : account?.role === 'ADMIN'
      ? menuListAdmin
      : [];

  return (
    <aside
      className={`flex flex-col w-full md:w-[30%] md:max-w-[280px] py-0 h-screen px-5 md:py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l sticky top-0 ${classNames}`}
    >
      <Link to="/" className="hidden md:block">
        <img className="w-auto h-7" src={LOGO} alt="" />
      </Link>

      <div className="flex flex-col justify-between  mt-6 h-full">
        <nav className="-mx-3 space-y-1 ">
          {menuList.map((menu: any) => {
            const menuItem = menu.pages.map((page: MenuItem) => (
              <Link
                className={`flex items-center group !mb-3 px-3 py-3 text-black justify-between transition-colors duration-300 transform rounded-lg  hover:bg-indigo-900 hover:text-white hover:shadow-xl ${
                  checkRouteActive(page.link, location.pathname) &&
                  ' bg-indigo-900 text-white'
                }`}
                to={page.link}
              >
                <div className="flex items-center">
                  {page.icon}
                  <span className="mx-2 text-sm font-medium">{page.title}</span>
                </div>
              </Link>
            ));

            menuItem.unshift(
              <h6 className="text-sm text-gray-400 ml-2 md:!mt-10 !mb-2">
                {menu.title}
              </h6>
            );
            return menuItem;
          })}
        </nav>
      </div>
      {account?.role === 'USER' && (
        <div>
          <div className="flex items-center justify-between">
            <h6 className="text-sm text-gray-400  md:!mt-5 mb-2">Kelas Saya</h6>
          </div>

          <nav className="-mx-3 space-y-3">
            <AnimatePresence>
              {myClass?.map((item: any) => (
                <motion.div
                  key={item.paketPembelianId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className=""
                >
                  <button
                    className={`flex items-center justify-between w-full px-3 py-3 group hover:text-white text-base font-medium text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-indigo-900 hover:shadow-xl ${
                      checkRouteActive(
                        `my-class/${item.paketPembelianId}`,
                        location.pathname,
                        item.paketPembelianId
                      ) && ' bg-indigo-900 text-white'
                    }`}
                    onClick={() => {
                      navigate(`/kelas/${item.paketPembelianId}`);
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      <IconBook2 />
                      <span className="text-left">
                        {item.paketPembelian?.nama}
                      </span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>
        </div>
      )}
    </aside>
  );
}
