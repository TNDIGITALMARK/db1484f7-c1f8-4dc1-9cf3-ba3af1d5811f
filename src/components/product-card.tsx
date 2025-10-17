'use client';

import Link from 'next/link';
import { Heart, Eye, ShieldCheck } from 'lucide-react';
import { Product, authLevelInfo } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const authInfo = authLevelInfo[product.authLevel];

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square relative bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={`${authInfo.color} border`}>
              <ShieldCheck className="w-3 h-3 mr-1" />
              {authInfo.label.split(' ')[0]}
            </Badge>
            {product.condition === 'New' && (
              <Badge className="bg-white/90 text-gray-800 border-gray-200">
                New
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {product.views}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-purple-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.series}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500 ml-1">USD</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 w-9 p-0 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 hover:bg-red-50`}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs text-gray-500">{product.likes}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <Button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
