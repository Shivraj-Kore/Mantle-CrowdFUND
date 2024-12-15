'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ethers } from 'ethers';
import { getWeb3Provider, getContract, connectWallet } from '@/utils/web3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

interface Campaign {
  id: string;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
}

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const provider = getWeb3Provider();
        const contract = getContract(provider);
        const campaignData = await contract.getCampaignById(id);
        
        setCampaign({
          id: id as string,
          owner: campaignData.owner,
          title: campaignData.title,
          description: campaignData.description,
          target: ethers.formatEther(campaignData.target),
          deadline: Number(campaignData.deadline),
          amountCollected: ethers.formatEther(campaignData.amountCollected),
          image: campaignData.image,
        });
      } catch (error) {
        console.error('Error fetching campaign:', error);
        toast.error('Failed to load campaign details. Please try again.');
      }
    };

    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      const signer = await connectWallet();
      const contract = getContract(signer);
      const tx = await contract.donateToCampaign(id, {
        value: ethers.parseEther(donationAmount),
      });
      await tx.wait();
      toast.success('Donation successful!');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error('Error donating:', error);
      toast.error('Donation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!campaign) {
    return <div className="text-center text-2xl mt-10">Loading campaign details...</div>;
  }

  const progress = (parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100;
  const isDeadlinePassed = new Date(campaign.deadline * 1000) < new Date();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white rounded">
      <div className="relative w-full h-64 mb-6 bg-gray-900 rounded-lg overflow-hidden border border-[#177F3D]">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <span className="text-[#4ADE80]">Campaign Image Unavailable</span>
          </div>
        ) : (
          <Image 
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4 text-[#4ADE80]">{campaign.title}</h1>
      <p className="text-gray-400 mb-6">{campaign.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-teal-400">Target</h2>
          <p className="text-2xl font-bold text-teal-200">{campaign.target} ETH</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-teal-400">Raised</h2>
          <p className="text-2xl font-bold text-green-400">{campaign.amountCollected} ETH</p>
        </div>
      </div>
      <div className="mb-6">
        <Progress value={progress} className="w-full h-2 bg-gray-800" />
        <p className="text-sm text-gray-500 mt-2">{progress.toFixed(2)}% funded</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-teal-400">Deadline</h2>
        <p className="text-lg">
          {new Date(campaign.deadline * 1000).toLocaleDateString()}
          {isDeadlinePassed && <span className="text-red-500 ml-2">(Ended)</span>}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-teal-400">Owner</h2>
        <p className="text-lg text-gray-300">{campaign.owner}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Input
          type="number"
          placeholder="Amount to donate (ETH)"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="flex-grow bg-gray-900 border-[#177F3D] text-white placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
          disabled={isDeadlinePassed}
        />
        <Button 
          onClick={handleDonate} 
          disabled={isLoading || isDeadlinePassed}
          className="bg-[#26CE63] hover:bg-[#177F3D] text-white"
        >
          {isLoading ? 'Processing...' : 'Donate'}
        </Button>
      </div>
      {isDeadlinePassed && (
        <p className="text-red-500 mt-4">This campaign has ended and is no longer accepting donations.</p>
      )}
    </div>
  );
}

