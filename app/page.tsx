import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-xl font-bold">MantleFund</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/campaigns" className="hover:text-green-400 transition-colors">
            Campaigns
          </Link>
          <Link href="/testimonials" className="hover:text-green-400 transition-colors">
            Testimonial
          </Link>
          <Button variant="outline" className="border-white hover:bg-green-400 hover:text-black">
            Contact Us
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-32 relative">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-black/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Join us in making a difference</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            Let's come{' '}
            <span className="text-green-400 block">Be Part</span> of Changes
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link href="/campaigns">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/about" className="group inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <span>Explore more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-40 right-10 hidden lg:block">
          <div className="bg-indigo-600 rounded-2xl p-6 mb-6 w-72">
            <img 
              src="/placeholder.svg?height=200&width=300" 
              alt="Campaign" 
              className="rounded-lg mb-4"
            />
            <div className="flex items-center justify-between">
              <span className="text-green-400">Start with small</span>
              <Button variant="secondary" size="sm">
                Save The world
              </Button>
            </div>
          </div>
          
          <div className="bg-green-400 rounded-full p-3 absolute -left-20 top-40">
            <Globe className="w-6 h-6 text-black" />
          </div>

          <div className="bg-indigo-600 rounded-2xl p-4 w-64 absolute -left-40 bottom-0">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-400"></div>
                <div className="w-8 h-8 rounded-full bg-indigo-400"></div>
                <div className="w-8 h-8 rounded-full bg-purple-400"></div>
              </div>
              <span className="font-bold">29k+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Together We Are Strong</span>
              <Heart className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <div className="p-6 rounded-2xl bg-gray-900">
            <Globe className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Global Community</h3>
            <p className="text-gray-400">Join our worldwide network of changemakers</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900">
            <Users className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">4k+ Backers</h3>
            <p className="text-gray-400">Growing community of supporters</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900">
            <Heart className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">$2M+ Raised</h3>
            <p className="text-gray-400">Successfully funded campaigns</p>
          </div>
        </div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 grid grid-cols-6 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-l border-gray-800" />
        ))}
      </div>
    </div>
  );
}