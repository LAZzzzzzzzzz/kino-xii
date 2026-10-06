import AuthModals from './AuthModals';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="relative bg-page font-sans text-primary">
      <Header className="absolute inset-x-0 top-0 z-10" />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AuthModals />
    </div>
  );
};
export default Layout;
