import React from 'react';
import Header from './Header';
import { Footer, Toast } from "flowbite-react";
import useToastStore from '@/store/toastStore';
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { visible, type, message, closeToast } = useToastStore();

  return (
    <div className="flex flex-col min-h-screen bg-white bg-gradient-to-r dark:bg-gray-900 relative">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto sm:px-0 px-4 py-4">
          {children}
        </div>
      </main>

      <Footer container className='rounded-none border-t dark:border-gray-700'>
        <Footer.Copyright href="/" by="Real Estate Crowdfunding. All rights reserved." year={2024} />
      </Footer>
      {visible && (
        <div className="absolute bottom-4 left-4">
          <div className="flex flex-col gap-4">
            <Toast className="border dark:border-gray-700">
              {type == 'success' &&
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                  <HiCheck className="h-5 w-5" />
                </div>
              }
              {type == 'error' &&
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
              }
              {type == 'warning' &&
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                  <HiExclamation className="h-5 w-5" />
                </div>
              }
              <div className="ml-3 text-sm font-normal">{message}</div>
              <Toast.Toggle onDismiss={closeToast} />
            </Toast>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
