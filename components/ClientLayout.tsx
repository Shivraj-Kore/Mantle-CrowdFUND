'use client'

import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from './connect-wallet';
import { usePathname } from 'next/navigation';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            CrowdFund
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/campaigns" className="text-gray-700 hover:text-indigo-600">
              Campaigns
            </Link>
            <Link href="/create-campaign" className="text-gray-700 hover:text-indigo-600">
              Create Campaign
            </Link>
            <ConnectWallet />
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          &copy; 2023 CrowdFund. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

