// 'use client'

// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { useRouter } from 'next/navigation';
// import { getContract, connectWallet } from '../../utils/web3';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'react-hot-toast';

// export default function CreateCampaign() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     target: '',
//     deadline: '',
//     image: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const signer = await connectWallet();
//       const contract = getContract(signer);
      
//       const transaction = await contract.createCampaign(
//         formData.title,
//         formData.description,
//         ethers.utils.parseEther(formData.target),
//         new Date(formData.deadline).getTime() / 1000,
//         formData.image
//       );

//       await transaction.wait();
      
//       toast.success('Campaign created successfully!');
//       router.push('/campaigns');
//     } catch (error) {
//       console.error('Error creating campaign:', error);
//       toast.error('Failed to create campaign. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Create a New Campaign</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//           <Input
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//           <Textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target Amount (ETH)</label>
//           <Input
//             id="target"
//             name="target"
//             type="number"
//             step="0.01"
//             value={formData.target}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
//           <Input
//             id="deadline"
//             name="deadline"
//             type="date"
//             value={formData.deadline}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
//           <Input
//             id="image"
//             name="image"
//             type="url"
//             value={formData.image}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <Button type="submit" className="w-full">Create Campaign</Button>
//       </form>
//     </div>
//   );
// }

// 'use client'

// import React, { useState } from 'react';
// import * as ethers from 'ethers';
// import { useRouter } from 'next/navigation';
// import { getContract, connectWallet } from '../../utils/web3';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'react-hot-toast';

// export default function CreateCampaign() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     target: '',
//     deadline: '',
//     image: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Validate title
//       if (formData.title.trim().length < 3) {
//         toast.error('Title must be at least 3 characters long');
//         return;
//       }

//       // Validate description
//       if (formData.description.trim().length < 10) {
//         toast.error('Description must be at least 10 characters long');
//         return;
//       }

//       // Validate target amount
//       const targetAmount = parseFloat(formData.target);
//       if (isNaN(targetAmount) || targetAmount <= 0) {
//         toast.error('Please enter a valid target amount');
//         return;
//       }

//       // Validate deadline
//       const deadlineDate = new Date(formData.deadline);
//       const today = new Date();
//       if (deadlineDate < today) {
//         toast.error('Deadline must be in the future');
//         return;
//       }

//       // Validate image URL (basic check)
//       try {
//         new URL(formData.image);
//       } catch {
//         toast.error('Please enter a valid image URL');
//         return;
//       }

//       // Connect wallet and get contract
//       const signer = await connectWallet();
//       const contract = getContract(signer);
      
//       // Convert target to wei and deadline to timestamp
//       const targetInWei = ethers.utils.parseEther(formData.target);
//       const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);

//       // Create campaign transaction
//       const transaction = await contract.createCampaign(
//         formData.title,
//         formData.description,
//         targetInWei,
//         deadlineTimestamp,
//         formData.image
//       );

//       // Wait for transaction confirmation
//       await transaction.wait();
      
//       // Success notification and redirect
//       toast.success('Campaign created successfully!');
//       router.push('/campaigns');
//     } catch (error) {
//       console.error('Error creating campaign:', error);
//       toast.error('Failed to create campaign. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Create a New Campaign</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//           <Input
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter campaign title"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//           <Textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Describe your campaign in detail"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-2">Target Amount (ETH)</label>
//           <Input
//             id="target"
//             name="target"
//             type="number"
//             step="0.01"
//             min="0"
//             value={formData.target}
//             onChange={handleChange}
//             placeholder="Enter target amount in ETH"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
//           <Input
//             id="deadline"
//             name="deadline"
//             type="date"
//             value={formData.deadline}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
//           <Input
//             id="image"
//             name="image"
//             type="url"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="Enter campaign image URL"
//             required
//           />
//         </div>
//         <Button 
//           type="submit" 
//           className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
//         >
//           Create Campaign
//         </Button>
//       </form>
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { useRouter } from 'next/navigation';
// import { getContract, connectWallet } from '@/utils/web3';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'react-hot-toast';

// export default function CreateCampaign() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     target: '',
//     deadline: '',
//     image: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Validation checks
//       if (formData.title.trim().length < 3) {
//         toast.error('Title must be at least 3 characters long');
//         return;
//       }

//       if (formData.description.trim().length < 10) {
//         toast.error('Description must be at least 10 characters long');
//         return;
//       }

//       const targetAmount = parseFloat(formData.target);
//       if (isNaN(targetAmount) || targetAmount <= 0) {
//         toast.error('Please enter a valid target amount');
//         return;
//       }

//       const deadlineDate = new Date(formData.deadline);
//       const today = new Date();
//       if (deadlineDate < today) {
//         toast.error('Deadline must be in the future');
//         return;
//       }

//       try {
//         new URL(formData.image);
//       } catch {
//         toast.error('Please enter a valid image URL');
//         return;
//       }

//       console.log('Target:', formData.target);

//       // Convert target to wei and deadline to timestamp
//       const targetInWei = ethers.parseEther(formData.target);
//       const deadlineTimestamp = BigInt(Math.floor(deadlineDate.getTime() / 1000));

//       // Connect wallet and get contract
//       const signer = await connectWallet();
//       const contract = getContract(signer);

//       // Create campaign transaction
//       const transaction = await contract.createCampaign(
//         formData.title,
//         formData.description,
//         targetInWei,
//         deadlineTimestamp,
//         formData.image
//       );

//       // Wait for transaction confirmation
//       await transaction.wait();

//       // Success notification and redirect
//       toast.success('Campaign created successfully!');
//       router.push('/campaigns');
//     } catch (error) {
//       console.error('Error creating campaign:', error);
//       toast.error('Failed to create campaign. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Create a New Campaign</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//           <Input
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter campaign title"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//           <Textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Describe your campaign in detail"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-2">Target Amount (ETH)</label>
//           <Input
//             id="target"
//             name="target"
//             type="number"
//             step="0.01"
//             min="0"
//             value={formData.target}
//             onChange={handleChange}
//             placeholder="Enter target amount in ETH"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
//           <Input
//             id="deadline"
//             name="deadline"
//             type="date"
//             value={formData.deadline}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
//           <Input
//             id="image"
//             name="image"
//             type="url"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="Enter campaign image URL"
//             required
//           />
//         </div>
//         <Button 
//           type="submit" 
//           className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
//         >
//           Create Campaign
//         </Button>
//       </form>
//     </div>
//   );
// }






'use client';

import React, { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { getContract, connectWallet } from '@/utils/web3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function CreateCampaign() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validation checks
      if (formData.title.trim().length < 3) {
        toast.error('Title must be at least 3 characters long');
        return;
      }

      if (formData.description.trim().length < 10) {
        toast.error('Description must be at least 10 characters long');
        return;
      }

      const targetAmount = parseFloat(formData.target);
      if (isNaN(targetAmount) || targetAmount <= 0) {
        toast.error('Please enter a valid target amount');
        return;
      }

      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate < today) {
        toast.error('Deadline must be in the future');
        return;
      }

      if (!formData.image) {
        toast.error('Please upload an image for the campaign');
        return;
      }

      // Convert target to wei and deadline to timestamp
      const targetInWei = ethers.parseEther(formData.target);
      const deadlineTimestamp = BigInt(Math.floor(deadlineDate.getTime() / 1000));

      // Upload image (implement your own upload logic here)
      const imageUrl = await uploadImage(formData.image);

      // Connect wallet and get contract
      const signer = await connectWallet();
      const contract = getContract(signer);

      // Create campaign transaction
      const transaction = await contract.createCampaign(
        formData.title,
        formData.description,
        targetInWei,
        deadlineTimestamp,
        imageUrl
      );

      // Wait for transaction confirmation
      await transaction.wait();

      // Success notification and redirect
      toast.success('Campaign created successfully!');
      router.push('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign. Please try again.');
    }
  };

  // Implement your own image upload function
  const uploadImage = async (file: File): Promise<string> => {
    // This is a placeholder. Implement your actual image upload logic here.
    // For example, you might upload to IPFS or a centralized storage service.
    return URL.createObjectURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Create a New Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter campaign title"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your campaign in detail"
            required
          />
        </div>
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-2">Target Amount (ETH)</label>
          <Input
            id="target"
            name="target"
            type="number"
            step="0.01"
            min="0"
            value={formData.target}
            onChange={handleChange}
            placeholder="Enter target amount in ETH"
            required
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Campaign Image</label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {previewUrl && (
            <div className="mt-2">
              <Image src={previewUrl} alt="Preview" width={200} height={200} className="rounded-lg" />
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Create Campaign
        </Button>
      </form>
    </div>
  );
}

