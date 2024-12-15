"use client"

import React, { useState, useEffect } from 'react';
import { connectWallet } from '../utils/web3';
import { Button } from '@/components/ui/button';

export const ConnectWallet: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      }
    };
    checkConnection();
  }, []);

  const handleConnect = async () => {
    try {
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setAddress(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <Button onClick={handleConnect} variant="outline">
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </Button>
  );
};

