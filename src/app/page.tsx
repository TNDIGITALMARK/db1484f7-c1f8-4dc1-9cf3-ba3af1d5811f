'use client';

import { useState } from 'react';
import { TrendingUp, Shield, Users, Zap, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { SearchFilterBar } from '@/components/search-filter-bar';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts, mockTransactions, getFeaturedProducts } from '@/lib/mock-data';
import Link from 'next/link';

export default function HomePage() {
  const [displayedProducts, setDisplayedProducts] = useState(mockProducts);
  const featuredProducts = getFeaturedProducts();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setDisplayedProducts(mockProducts);
      return;
    }
    const filtered = mockProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.series.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockProducts];

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.condition) {
      filtered = filtered.filter(p => p.condition === filters.condition);
    }

    if (filters.authLevel) {
      filtered = filtered.filter(p => p.authLevel === filters.authLevel);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        // Featured items first
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setDisplayedProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2">
              🎉 Trusted by 50,000+ Labubu Collectors Worldwide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Rare Labubu
              <br />
              <span className="text-yellow-300">Collectibles</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Buy, sell, and trade authenticated Labubu items with confidence. Join the largest community of collectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              >
                Start Collecting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
                >
                  Sell Your Items
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, label: '50K+ Users', value: 'Active Collectors' },
              { icon: Shield, label: '100% Secure', value: 'Buyer Protection' },
              { icon: TrendingUp, label: '$2M+', value: 'Total Sales' },
              { icon: Zap, label: '24/7', value: 'Support' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
                <div className="font-bold text-lg">{stat.label}</div>
                <div className="text-sm text-white/80">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <SearchFilterBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Listings</h2>
            <p className="text-gray-600">Hand-picked rare and trending collectibles</p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recent Sales Section */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Sales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-900">{tx.productName}</div>
                  <div className="text-sm text-gray-500">Sold to {tx.buyer}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${tx.price}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(tx.soldDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Collectibles</h2>
            <p className="text-gray-600">{displayedProducts.length} items available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button className="mt-4" variant="outline" onClick={() => setDisplayedProducts(mockProducts)}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Collection?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of collectors buying and selling authenticated Labubu items daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8"
            >
              Create Free Account
            </Button>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                List Your First Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div>
                  <span className="font-bold text-lg">Labubu</span>
                  <span className="text-gray-400 text-xs block leading-none">Marketplace</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                The trusted marketplace for Labubu collectors worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Authentication</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Buyer Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Labubu Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
