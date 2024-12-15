// 'use client'

// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { getWeb3Provider, getContract } from '../../utils/web3';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// interface Campaign {
//   id: number;
//   title: string;
//   description: string;
//   target: string;
//   deadline: number;
//   amountCollected: string;
//   image: string;
// }

// export default function Campaigns() {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const provider = getWeb3Provider();
//         const contract = getContract(provider);
//         const campaignIds = await contract.getCampaignIds();
        
//         const campaignsData = await Promise.all(
//           campaignIds.map(async (id: number) => {
//             const campaign = await contract.getCampaignById(id);
//             return {
//               id: id.toString(),
//               title: campaign.title,
//               description: campaign.description,
//               target: ethers.utils.formatEther(campaign.target),
//               deadline: Number(campaign.deadline),
//               amountCollected: ethers.utils.formatEther(campaign.amountCollected),
//               image: campaign.image,
//             };
//           })
//         );
        
//         setCampaigns(campaignsData);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       }
//     };

//     fetchCampaigns();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Active Campaigns</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {campaigns.map((campaign) => (
//           <Card key={campaign.id} className="overflow-hidden">
//             <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
//             <CardHeader>
//               <CardTitle>{campaign.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-600 mb-4">{campaign.description.slice(0, 100)}...</p>
//               <div className="flex justify-between text-sm text-gray-500">
//                 <span>Target: {campaign.target} ETH</span>
//                 <span>Raised: {campaign.amountCollected} ETH</span>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Link href={`/campaigns/${campaign.id}`} className="w-full">
//                 <Button className="w-full">View Campaign</Button>
//               </Link>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client'

// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { readCampaigns } from '../../utils/web3';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// interface Campaign {
//   id: number;
//   owner: string;
//   title: string;
//   description: string;
//   target: bigint;
//   deadline: bigint;
//   amountCollected: bigint;
//   image: string;
// }

// export default function Campaigns() {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         setIsLoading(true);
//         const fetchedCampaigns = await readCampaigns();
//         setCampaigns(fetchedCampaigns);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//         setError(error instanceof Error ? error.message : 'An unknown error occurred');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCampaigns();
//   }, []);

//   if (isLoading) {
//     return <div className="text-center text-xl mt-10">Loading campaigns...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 mt-10">
//         <h2 className="text-2xl font-bold mb-4">Error Loading Campaigns</h2>
//         <p>{error}</p>
//         <p className="mt-4 text-sm text-gray-600">
//           Please check your contract connection and try again.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Active Campaigns</h1>
//       {campaigns.length === 0 ? (
//         <div className="text-center text-gray-600">No campaigns found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {campaigns.map((campaign) => (
//             <Card key={campaign.id} className="overflow-hidden">
//               <img 
//                 src={campaign.image} 
//                 alt={campaign.title} 
//                 className="w-full h-48 object-cover" 
//                 onError={(e) => {
//                   const imgElement = e.target as HTMLImageElement;
//                   imgElement.src = '/placeholder-image.jpg'; // Provide a fallback image
//                 }}
//               />
//               <CardHeader>
//                 <CardTitle>{campaign.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 mb-4">
//                   {campaign.description.length > 100 
//                     ? `${campaign.description.slice(0, 100)}...` 
//                     : campaign.description}
//                 </p>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Target: {ethers.formatEther(campaign.target)} ETH</span>
//                   <span>Raised: {ethers.formatEther(campaign.amountCollected)} ETH</span>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Link href={`/campaigns/${campaign.id}`} className="w-full">
//                   <Button className="w-full">View Campaign</Button>
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


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
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Active Campaigns</h1>
      {campaigns.length === 0 ? (
        <div className="text-center text-gray-600">No campaigns found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image 
                  src={campaign.image} 
                  alt={campaign.title}
                  layout="fill"
                  objectFit="cover"
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
                <CardTitle>{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
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
                  <Button className="w-full">View Campaign</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


