'use client';

import Link from 'next/link';
import { ShoppingBag, Heart, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Labubu
              </span>
              <span className="text-gray-600 text-sm block leading-none">Marketplace</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Browse
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Sell
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Community
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            <Link href="/dashboard">
              <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Sell Now
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link href="/" className="text-lg font-medium hover:text-purple-600 transition-colors">
                    Browse
                  </Link>
                  <Link href="/sell" className="text-lg font-medium hover:text-purple-600 transition-colors">
                    Sell
                  </Link>
                  <Link href="/dashboard" className="text-lg font-medium hover:text-purple-600 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="#" className="text-lg font-medium hover:text-purple-600 transition-colors">
                    Community
                  </Link>
                  <Link href="#" className="text-lg font-medium hover:text-purple-600 transition-colors">
                    Wishlist
                  </Link>
                  <Link href="#" className="text-lg font-medium hover:text-purple-600 transition-colors">
                    Profile
                  </Link>
                  <Button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Sell Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
