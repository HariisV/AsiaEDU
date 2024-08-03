import ReactSlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LOGO from '@/assets/Logo.png';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

export default function JokoComponent() {
  // Pengaturan slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const account = useAuthStore((state) => state.user);

  console.log(account);
  return (
    <div>
      {/* Navigation Bar */}
      {/* <nav style={styles.navbar}>
        <div style={styles.navLogo}>
          <img className="mx-auto h-10 w-auto" src={LOGO} alt="Your Company" />
        </div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>
            <a href="#hero" style={styles.navLink}>
              Home
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#features" style={styles.navLink}>
              Features
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#testimonials" style={styles.navLink}>
              Testimonials
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#team" style={styles.navLink}>
              Team
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#contact" style={styles.navLink}>
              Contact
            </a>
          </li>
        </ul>
      </nav> */}
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={LOGO} alt="" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12"></div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {account?.name ? (
                <Link
                  to={account?.role === 'USER' ? '/home' : '/dashboard'}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Dashboard <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </nav>
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src={LOGO} alt="" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Product
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Marketplace
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Company
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="relative isolate pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Asia<span className="text-primary">EDU</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Platform pembelajaran online yang membantu siswa dan guru
                  untuk belajar dan mengajar dengan mudah.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/auth/register"
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Daftar
                  </Link>
                </div>
              </div>
              {/* <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                    alt="App screenshot"
                    width="2432"
                    height="1442"
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}

      {/* Team Section */}
      <section id="team" className="text-center p-12 bg-white">
        <h1 className="text-2xl font-semibold">KELOMPOK 1</h1>
        <small className="mb-20">PEMPROGRAMAN WEB 2</small>
        <div className="mt-10 flex justify-center flex-wrap gap-5">
          <div className="text-center w-48">
            <div className="w-full flex justify-center">
              <img
                src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                alt="Team Member 1"
                className="w-36 h-36 rounded-full mb-2"
              />
            </div>
            <h3>HARIS</h3>
            <p>KETUA</p>
          </div>
          <div className="text-center w-48">
            <div className="w-full flex justify-center">
              <img
                src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                alt="Team Member 2"
                className="w-36 h-36 rounded-full mb-2"
              />
            </div>
            <h3>IQBAL</h3>
            <p>ANGGOTA</p>
          </div>
          <div className="text-center w-48">
            <div className="w-full flex justify-center">
              <img
                src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                alt="Team Member 3"
                className="w-36 h-36 rounded-full mb-2"
              />
            </div>
            <h3>AGUS</h3>
            <p>ANGGOTA</p>
          </div>
          <div className="text-center w-48">
            <div className="w-full flex justify-center">
              <img
                src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                alt="Team Member 4"
                className="w-36 h-36 rounded-full mb-2"
              />
            </div>
            <h3>UJANG</h3>
            <p>ANGGOTA</p>
          </div>
          <div className="text-center w-48">
            <div className="w-full flex justify-center">
              <img
                src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                alt="Team Member 5"
                className="w-36 h-36 rounded-full mb-2"
              />
            </div>
            <h3>JOKO</h3>
            <p>ANGGOTA</p>
          </div>
          <div className="text-center w-48">
            <div className="w-full flex justify-center">
              <img
                src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                alt="Team Member 6"
                className="w-36 h-36 rounded-full mb-2"
              />
            </div>
            <h3>CHELSEA</h3>
            <p>ANGGOTA</p>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="p-12 bg-white text-center">
        <h2 className="mb-10">Partners</h2>
        <ReactSlickSlider {...settings}>
          <div className="px-2">
            <img
              src="https://maukuliah.ap-south-1.linodeobjects.com/logo/031068.jpg"
              alt="Logo 1"
              className="w-36 h-auto"
            />
          </div>
          <div className="px-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ed-ZFXOZ0UGQ_Ny27BiACH7q3fETJvGnHw&s"
              alt="Logo 2"
              className="w-36 h-auto"
            />
          </div>
          <div className="px-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiOUpdDTD4VMYX-q8cRSTiN5J9y4eWEWVIh_ysiWnCZS9PoKj45IXRigFswlIL3I5niQ&usqp=CAU"
              alt="Logo 3"
              className="w-36 h-auto"
            />
          </div>
          <div className="px-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKz4NbsiYyG4QdDkxTzbMN5L8Tbd4j1fjxqQ&s"
              alt="Logo 4"
              className="w-36 h-auto"
            />
          </div>
          <div className="px-2">
            <img
              src="https://www.angon.co.id/wp-content/uploads/2023/10/1686539179.png"
              alt="Logo 5"
              className="w-36 h-auto"
            />
          </div>
          <div className="px-2">
            <img
              src="https://images.tokopedia.net/img/FZfiOH/2021/11/19/de9b0123-15c0-4c94-89fc-eba2da9da89c.png"
              alt="Logo 6"
              className="w-36 h-auto"
            />
          </div>
        </ReactSlickSlider>
      </section>
    </div>
  );
}
