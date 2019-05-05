import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = ({ children }) => (
  <div className="App">
    <Navbar />
    <div className="container">
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;