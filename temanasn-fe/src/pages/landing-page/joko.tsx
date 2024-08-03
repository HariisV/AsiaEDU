import ReactSlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Gaya untuk komponen
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: '#333',
    color: '#fff',
  },
  navLogo: {
    fontSize: '24px',
  },
  navLinks: {
    listStyleType: 'none',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    margin: '0',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  hero: {
    textAlign: 'center',
    padding: '50px',
    background: '#f4f4f4',
  },
  ctaButton: {
    padding: '10px 20px',
    fontSize: '16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  features: {
    padding: '50px',
    background: '#fff',
  },
  featureItem: {
    marginBottom: '20px',
  },
  testimonials: {
    padding: '50px',
    background: '#f9f9f9',
  },
  testimonialItem: {
    marginBottom: '20px',
  },
  team: {
    padding: '50px',
    background: '#fff',
    textAlign: 'center',
  },
  teamContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  teamMember: {
    textAlign: 'center',
    width: '200px',
  },
  teamPhoto: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  logoCarousel: {
    padding: '50px',
    background: '#fff',
    textAlign: 'center',
  },
  logoItem: {
    padding: '0 10px',
  },
  logo: {
    width: '150px',
    height: 'auto',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    background: '#333',
    color: '#fff',
  },
};

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

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navLogo}>VIRACUN</div>
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
      </nav>

      {/* Hero Section */}
      <section id="hero" style={styles.hero}>
        <h1>VIRACUN</h1>
        <p>SATU UNTUK PINTAR</p>
        <button style={styles.ctaButton}>BELI PAKET</button>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <h2>Features</h2>
        <div style={styles.featureItem}>
          <h3>Feature 1</h3>
          <p>feature 1.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>Feature 2</h3>
          <p>feature 2.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>Feature 3</h3>
          <p>feature 3.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={styles.testimonials}>
        <h2>Testimonials</h2>
        <div style={styles.testimonialItem}>
          <p>"changed my life!"</p>
          <p>- Happy Customer</p>
        </div>
        <div style={styles.testimonialItem}>
          <p>"Amazing service."</p>
          <p>- Satisfied User</p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" style={styles.team}>
        <h1>KELOMPOK 1</h1>
        <h2>PEMPROGRAMAN WEB 2</h2>
        <div style={styles.teamContainer}>
          <div style={styles.teamMember}>
            <img
              src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
              alt="Team Member 1"
              style={styles.teamPhoto}
            />
            <h3>HARIS</h3>
            <p>KETUA</p>
          </div>
          <div style={styles.teamMember}>
            <img
              src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
              alt="Team Member 2"
              style={styles.teamPhoto}
            />
            <h3>IQBAL</h3>
            <p>ANGGOTA</p>
          </div>
          <div style={styles.teamMember}>
            <img
              src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
              alt="Team Member 3"
              style={styles.teamPhoto}
            />
            <h3>AGUS</h3>
            <p>ANGGOTA</p>
          </div>
          <div style={styles.teamMember}>
            <img
              src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
              alt="Team Member 4"
              style={styles.teamPhoto}
            />
            <h3>UJANG</h3>
            <p>ANGGOTA</p>
          </div>
          <div style={styles.teamMember}>
            <img
              src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
              alt="Team Member 5"
              style={styles.teamPhoto}
            />
            <h3>JOKO</h3>
            <p>ANGGOTA</p>
          </div>
          <div style={styles.teamMember}>
            <img
              src="https://pasca.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
              alt="Team Member 6"
              style={styles.teamPhoto}
            />
            <h3>CHELSEA</h3>
            <p>ANGGOTA</p>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section style={styles.logoCarousel}>
        <h2>Partners</h2>
        <ReactSlickSlider {...settings}>
          <div style={styles.logoItem}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo 1"
              style={styles.logo}
            />
          </div>
          <div style={styles.logoItem}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo 2"
              style={styles.logo}
            />
          </div>
          <div style={styles.logoItem}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo 3"
              style={styles.logo}
            />
          </div>
          <div style={styles.logoItem}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo 4"
              style={styles.logo}
            />
          </div>
          <div style={styles.logoItem}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo 5"
              style={styles.logo}
            />
          </div>
          <div style={styles.logoItem}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo 6"
              style={styles.logo}
            />
          </div>
        </ReactSlickSlider>
      </section>
    </div>
  );
}
