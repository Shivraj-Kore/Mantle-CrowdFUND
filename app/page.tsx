import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, Heart } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between bg-gray-900 shadow-md border-b border-teal-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          <span className="text-xl font-bold text-teal-300">MantleFund</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/campaigns" className="text-gray-300 hover:text-teal-400 transition-colors">
            Campaigns
          </Link>
          <Link href="/testimonials" className="text-gray-300 hover:text-teal-400 transition-colors">
            Testimonial
          </Link>
          <Button variant="outline" className="border-teal-700 text-white hover:bg-teal-600 hover:text-white">
            Contact Us
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-32 relative">
        <div className="max-w-4xl">
          {/* <div className="inline-flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <span className="text-gray-300">Join us in making a difference</span>
          </div> */}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            Let's come{' '}
            <span className="text-teal-400 block">Be Part</span> of Changes
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link href="/campaigns">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/about" className="group inline-flex items-center space-x-2 text-gray-400 hover:text-teal-300 transition-colors">
              <span>Explore more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <BackgroundBeams></BackgroundBeams>


        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <div className="p-6 rounded-2xl bg-gray-900 border border-teal-800 hover:bg-gray-800 transition-colors">
            <Globe className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-teal-300">Global Community</h3>
            <p className="text-gray-400">Join our worldwide network of changemakers</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 border border-teal-800 hover:bg-gray-800 transition-colors">
            <Users className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-teal-300">4k+ Backers</h3>
            <p className="text-gray-400">Growing community of supporters</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 border border-teal-800 hover:bg-gray-800 transition-colors">
            <Heart className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-teal-300">$2M+ Raised</h3>
            <p className="text-gray-400">Successfully funded campaigns</p>
          </div>
        </div>
      </div>
    </div>
  );
}