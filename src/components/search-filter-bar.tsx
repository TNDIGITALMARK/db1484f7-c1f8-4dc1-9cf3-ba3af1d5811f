'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories } from '@/lib/mock-data';

interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}

export function SearchFilterBar({ onSearch, onFilterChange }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [condition, setCondition] = useState('all');
  const [authLevel, setAuthLevel] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleFilterApply = () => {
    onFilterChange?.({
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      condition: condition === 'all' ? undefined : condition,
      authLevel: authLevel === 'all' ? undefined : authLevel,
      sortBy
    });
  };

  const activeFiltersCount = [
    selectedCategory !== 'All' ? 1 : 0,
    condition !== 'all' ? 1 : 0,
    authLevel !== 'all' ? 1 : 0,
    priceRange[0] !== 0 || priceRange[1] !== 300 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Labubu collectibles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* Quick Category Pills - Desktop */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.slice(0, 5).map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Sort Select */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative h-11">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-purple-600 text-white h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your search with these filters
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Badge
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'outline'}
                        className={`cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300}
                    step={5}
                    className="mt-2"
                  />
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Condition</label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Authentication Level */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Authentication</label>
                  <Select value={authLevel} onValueChange={setAuthLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select auth level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="community">Community Verified</SelectItem>
                      <SelectItem value="verified">Platform Verified</SelectItem>
                      <SelectItem value="expert">Expert Authenticated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, 300]);
                      setCondition('all');
                      setAuthLevel('all');
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={handleFilterApply}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Category Scroll */}
        <div className="lg:hidden flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.slice(0, 8).map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
