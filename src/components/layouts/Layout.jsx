import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = ({ children }) => {
    return (
        <div id="bodyWrapper" style={{ position: 'relative', minHeight: '100vh' }}>
            <Header />
            {children}
            <Footer />
            </div>
    );
}

export default Layout;