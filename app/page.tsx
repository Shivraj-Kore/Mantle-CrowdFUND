// import Link from 'next/link';
// import { Button } from '@/components/ui/button';

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
//       <h1 className="text-5xl font-bold mb-6 text-indigo-700">Welcome to CrowdFund</h1>
//       <p className="text-xl mb-8 max-w-2xl text-gray-600">
//         Empower change, fuel innovation, and support causes you believe in through our decentralized crowdfunding platform.
//       </p>
//       <Link href="/campaigns">
//         <Button size="lg" className="text-lg px-8 py-4">
//           Get Started
//         </Button>
//       </Link>
//     </div>
//   );
// }

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            CrowdFund
          </span>
        </h1>
        <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
          Empower change, fuel innovation, and support causes you believe in through our decentralized crowdfunding platform on the Mantle chain.
        </p>
        <Link href="/campaigns">
          <Button size="lg" className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <FeatureCard 
          icon="💡"
          title="Innovative Projects"
          description="Discover groundbreaking ideas and be part of the next big thing."
        />
        <FeatureCard 
          icon="🌍"
          title="Global Impact"
          description="Support causes that matter, no matter where you are in the world."
        />
        <FeatureCard 
          icon="🔒"
          title="Secure & Transparent"
          description="Blockchain technology ensures your contributions are safe and traceable."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
}

