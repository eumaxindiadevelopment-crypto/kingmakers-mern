import { Outlet } from 'react-router-dom';
import TopBar from './header/TopBar';
import Navbar from './header/Navbar';
import HeaderMiddle from './header/HeaderMiddle';
import Footer from './footer/Footer';

const Layout = () => {
  return (
    <main>
      <TopBar />
      <HeaderMiddle />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
