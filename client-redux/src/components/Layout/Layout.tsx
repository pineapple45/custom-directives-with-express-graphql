import React from 'react';
import Navbar from '../NavBar';
import Footer from '../Footer';

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <br />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
