'use client';

import { Star, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import { Seller } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SellerProfileWidgetProps {
  seller: Seller;
  showMessageButton?: boolean;
}

export function SellerProfileWidget({ seller, showMessageButton = true }: SellerProfileWidgetProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-purple-200">
          <AvatarImage src={seller.avatar} alt={seller.username} />
          <AvatarFallback>{seller.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {seller.username}
            </h3>
            {seller.isVerified && (
              <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{seller.rating}</span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">
              {seller.totalSales} sales
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <Clock className="h-4 w-4" />
            <span>Responds {seller.responseTime}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {seller.badges.map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="text-xs bg-purple-50 text-purple-700 border-purple-200"
              >
                {badge}
              </Badge>
            ))}
          </div>

          {showMessageButton && (
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message Seller
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-gray-900">{seller.totalSales}</div>
          <div className="text-xs text-gray-500">Total Sales</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{seller.rating}</div>
          <div className="text-xs text-gray-500">Rating</div>
        </div>
      </div>
    </div>
  );
}
