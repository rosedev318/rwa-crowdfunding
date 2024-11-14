import React from 'react';
import Header from './Header';
import { Footer } from "flowbite-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto py-4">
          {children}
        </div>
      </main>

      <Footer container className='rounded-none border-t'>
        <Footer.Copyright href="/" by="Real Estate Crowdfunding. All rights reserved." year={2024} />
      </Footer>
    </div>
  );
};

export default Layout;
