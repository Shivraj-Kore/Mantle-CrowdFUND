// import { ethers } from 'ethers';
// import { CONTRACT_ABI, CONTRACT_ADDRESS, MANTLE_TESTNET_RPC, MANTLE_TESTNET_CHAIN_ID } from '../config';

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// export const getWeb3Provider = () => {
//   if (typeof window !== 'undefined' && window.ethereum) {
//     return new ethers.BrowserProvider(window.ethereum);
//   }
//   return new ethers.JsonRpcProvider(MANTLE_TESTNET_RPC);
// };

// export const getContract = (provider: ethers.Provider) => {
//   return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
// };

// export const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const provider = getWeb3Provider();
//       const network = await provider.getNetwork();
      
//       // Convert MANTLE_TESTNET_CHAIN_ID to bigint
//       const expectedChainId = BigInt(MANTLE_TESTNET_CHAIN_ID);
      
//       if (network.chainId !== expectedChainId) {
//         await window.ethereum.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
//         });
//       }
//       return await provider.getSigner();
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//       throw error;
//     }
//   } else {
//     throw new Error('Ethereum wallet not detected');
//   }
// };


// import { ethers } from 'ethers';
// import { CONTRACT_ABI, CONTRACT_ADDRESS, MANTLE_TESTNET_RPC, MANTLE_TESTNET_CHAIN_ID } from '../config';

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// export const getWeb3Provider = () => {
//   if (typeof window !== 'undefined' && window.ethereum) {
//     return new ethers.BrowserProvider(window.ethereum);
//   }
//   return new ethers.JsonRpcProvider(MANTLE_TESTNET_RPC);
// };

// export const getContract = (provider: ethers.Provider) => {
//   return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
// };

// export const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       // In ethers v6, request is done slightly differently
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const network = await provider.getNetwork();
      
//       // Convert MANTLE_TESTNET_CHAIN_ID to bigint
//       const expectedChainId = BigInt(MANTLE_TESTNET_CHAIN_ID);
      
//       if (network.chainId !== expectedChainId) {
//         await window.ethereum.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
//         });
//       }
//       return signer;
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//       throw error;
//     }
//   } else {
//     throw new Error('Ethereum wallet not detected');
//   }
// };

// // Helper function to read campaigns
// export const readCampaigns = async () => {
//   const provider = getWeb3Provider();
//   const contract = getContract(provider);

//   try {
//     // Get total number of campaigns
//     const numberOfCampaigns = await contract.numberOfCampaigns();
    
//     // Fetch campaign IDs dynamically
//     const campaignIds = [];
//     for (let i = 0; i < Number(numberOfCampaigns); i++) {
//       campaignIds.push(i);
//     }

//     // Fetch campaigns
//     const campaignsPromises = campaignIds.map(async (id) => {
//       const campaign = await contract.getCampaignById(id);
//       return {
//         id,
//         owner: campaign[0],
//         title: campaign[1],
//         description: campaign[2],
//         target: campaign[3],
//         deadline: campaign[4],
//         amountCollected: campaign[5],
//         image: campaign[6],
//       };
//     });

//     return await Promise.all(campaignsPromises);
//   } catch (error) {
//     console.error('Error reading campaigns:', error);
//     throw error;
//   }
// };


// import { ethers } from 'ethers';
// import { CONTRACT_ABI, CONTRACT_ADDRESS, MANTLE_TESTNET_RPC, MANTLE_TESTNET_CHAIN_ID } from '../config';

// declare global {
//   interface Window {
//     ethereum?: ethers.Eip1193Provider;
//   }
// }

// export const getWeb3Provider = (): ethers.Provider => {
//   if (typeof window !== 'undefined' && window.ethereum) {
//     return new ethers.BrowserProvider(window.ethereum);
//   }
//   return new ethers.JsonRpcProvider(MANTLE_TESTNET_RPC);
// };

// export const getContract = (provider: ethers.Provider): ethers.Contract => {
//   return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
// };

// export const connectWallet = async (): Promise<ethers.Signer> => {
//   if (typeof window !== 'undefined' && window.ethereum) {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const network = await provider.getNetwork();
      
//       const expectedChainId = BigInt(MANTLE_TESTNET_CHAIN_ID);
      
//       if (network.chainId !== expectedChainId) {
//         await window.ethereum.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
//         });
//       }
//       return signer;
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//       throw new Error('Failed to connect wallet. Please try again.');
//     }
//   } else {
//     throw new Error('Ethereum wallet not detected. Please install MetaMask or another compatible wallet.');
//   }
// };

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

// export const readCampaigns = async (): Promise<Campaign[]> => {
//   const provider = getWeb3Provider();
//   const contract = getContract(provider);

//   try {
//     const numberOfCampaigns = await contract.numberOfCampaigns();
    
//     const campaignIds = Array.from({ length: Number(numberOfCampaigns) }, (_, i) => i);

//     const campaignsPromises = campaignIds.map(async (id): Promise<Campaign> => {
//       const campaign = await contract.getCampaignById(id);
//       return {
//         id,
//         owner: campaign[0],
//         title: campaign[1],
//         description: campaign[2],
//         target: campaign[3],
//         deadline: campaign[4],
//         amountCollected: campaign[5],
//         image: campaign[6],
//       };
//     });

//     return await Promise.all(campaignsPromises);
//   } catch (error) {
//     console.error('Error reading campaigns:', error);
//     throw new Error('Failed to read campaigns. Please try again later.');
//   }
// };

import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS, MANTLE_TESTNET_RPC, MANTLE_TESTNET_CHAIN_ID } from '../config';

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export const getWeb3Provider = (): ethers.Provider => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return new ethers.JsonRpcProvider(MANTLE_TESTNET_RPC);
};

export const getContract = (signerOrProvider: ethers.Signer | ethers.Provider): ethers.Contract => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
};

export const connectWallet = async (): Promise<ethers.Signer> => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      
      const expectedChainId = BigInt(MANTLE_TESTNET_CHAIN_ID);
      
      if (network.chainId !== expectedChainId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
        });
      }
      return signer;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw new Error('Failed to connect wallet. Please try again.');
    }
  } else {
    throw new Error('Ethereum wallet not detected. Please install MetaMask or another compatible wallet.');
  }
};

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

export const readCampaigns = async (): Promise<Campaign[]> => {
  const provider = getWeb3Provider();
  const contract = getContract(provider);

  try {
    const numberOfCampaigns = await contract.numberOfCampaigns();
    
    const campaignIds = Array.from({ length: Number(numberOfCampaigns) }, (_, i) => i);

    const campaignsPromises = campaignIds.map(async (id): Promise<Campaign> => {
      const campaign = await contract.getCampaignById(id);
      return {
        id,
        owner: campaign[0],
        title: campaign[1],
        description: campaign[2],
        target: campaign[3],
        deadline: campaign[4],
        amountCollected: campaign[5],
        image: campaign[6],
      };
    });

    return await Promise.all(campaignsPromises);
  } catch (error) {
    console.error('Error reading campaigns:', error);
    throw new Error('Failed to read campaigns. Please try again later.');
  }
};
