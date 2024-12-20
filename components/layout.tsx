import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from './connect-wallet';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
<div className="min-h-screen flex flex-col bg-black">
      <header className="bg-gray-900 shadow-md border-b border-teal-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#4ADE80]">
          MantleFund
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/campaigns" className="text-gray-300 hover:text-teal-400 transition-colors">
              Campaigns
            </Link>
            <Link href="/create-campaign" className="text-gray-300 hover:text-teal-400 transition-colors">
              Create Campaign
            </Link>
            <ConnectWallet />
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-gray-900 text-gray-300 py-4 border-t border-teal-800">
        <div className="container mx-auto px-6 text-center">
          &copy; 2024 MantleFund. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

