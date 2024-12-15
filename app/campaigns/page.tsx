'use client'

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { readCampaigns } from '@/utils/web3';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Campaign {
  id: number;
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const fetchedCampaigns = await readCampaigns();
        setCampaigns(fetchedCampaigns);
        setError(null);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (isLoading) {
    return <div className="text-center text-xl mt-10">Loading campaigns...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        <h2 className="text-2xl font-bold mb-4">Error Loading Campaigns</h2>
        <p>{error}</p>
        <p className="mt-4 text-sm text-gray-600">
          Please check your contract connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#4ADE80]">Active Campaigns</h1>
      {campaigns.length === 0 ? (
        <div className="text-center text-gray-500">No campaigns found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden bg-gray-900 border border-teal-800 rounded-lg">
              <div className="relative h-48 w-full">
                <Image 
                  src={campaign.image} 
                  alt={campaign.title}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                  onError={() => {
                    // Fallback to placeholder image on error
                    const imgElement = document.getElementById(`campaign-image-${campaign.id}`) as HTMLImageElement;
                    if (imgElement) {
                      imgElement.src = '/placeholder-image.jpg';
                    }
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-[#4ADE80]">{campaign.title}</CardTitle>
              </CardHeader>
              <hr className="bg-[#177F3D] h-[1px] border-0 mx-[25px] mb-2" />
              <CardContent>
                <p className="text-gray-400 mb-4">
                  {campaign.description.length > 100 
                    ? `${campaign.description.slice(0, 100)}...` 
                    : campaign.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Target: {ethers.formatEther(campaign.target)} ETH</span>
                  <span>Raised: {ethers.formatEther(campaign.amountCollected)} ETH</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/campaigns/${campaign.id}`} className="w-full">
                  <Button className="w-full bg-[#26CE63] hover:bg-[#177F3D] text-white">View Campaign</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


