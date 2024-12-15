import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <h1 className="text-5xl font-bold mb-6 text-indigo-700">Welcome to CrowdFund</h1>
      <p className="text-xl mb-8 max-w-2xl text-gray-600">
        Empower change, fuel innovation, and support causes you believe in through our decentralized crowdfunding platform.
      </p>
      <Link href="/campaigns">
        <Button size="lg" className="text-lg px-8 py-4">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

