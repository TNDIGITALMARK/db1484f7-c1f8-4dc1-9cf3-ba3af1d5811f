'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Heart,
  Share2,
  ShieldCheck,
  Package,
  Truck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { SellerProfileWidget } from '@/components/seller-profile-widget';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getProductBySlug,
  getSellerById,
  mockProducts,
  authLevelInfo
} from '@/lib/mock-data';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const seller = getSellerById(product.sellerId);
  const authInfo = authLevelInfo[product.authLevel];
  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.series === product.series))
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-purple-600">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden group">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-purple-600 ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge className={`${authInfo.color} border mb-3`}>
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    {authInfo.label}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {product.views} views
                    </span>
                    <span>•</span>
                    <span>{product.likes} likes</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={isLiked ? 'text-red-500 border-red-200' : ''}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500">USD</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {product.condition}
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {product.series}
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {product.category}
                </Badge>
              </div>

              <Separator className="my-6" />

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Package className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-xs text-gray-500">Condition</div>
                    <div className="font-semibold">{product.condition}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-xs text-gray-500">Shipping</div>
                    <div className="font-semibold">Worldwide</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-xs text-gray-500">Protection</div>
                    <div className="font-semibold">Guaranteed</div>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6"
              >
                Buy Now - ${product.price}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full mt-3 text-lg py-6"
              >
                Make an Offer
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold text-green-900 mb-1">Buyer Protection</div>
                    <div className="text-green-700">
                      Full refund if item is not as described. Secure payment processing. Money-back guarantee.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-bold">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Details</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Condition:</span>
                    <span className="font-medium text-gray-900">{product.condition}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Series:</span>
                    <span className="font-medium text-gray-900">{product.series}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium text-gray-900">{product.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Authentication:</span>
                    <span className="font-medium text-gray-900">{authInfo.label}</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="authentication" className="space-y-4">
              <h3 className="text-xl font-bold">Authentication Details</h3>
              <div className={`p-4 rounded-lg border ${authInfo.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-semibold">{authInfo.label}</span>
                </div>
                <p className="text-sm">{authInfo.description}</p>
              </div>
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold">What this means:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Item authenticity verified by professionals</li>
                  <li>✓ Detailed authentication report available</li>
                  <li>✓ Certificate of authenticity included</li>
                  <li>✓ Protected by buyer guarantee</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4">
              <h3 className="text-xl font-bold">Shipping Information</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2">Worldwide Shipping Available</div>
                  <p className="text-sm text-gray-600">
                    We ship to most countries worldwide with tracked shipping options.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Domestic (US)</span>
                    <span className="font-semibold">3-5 business days</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>International</span>
                    <span className="font-semibold">7-14 business days</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Packaging</h4>
                  <p className="text-gray-600">
                    All items are carefully packaged with protective materials to ensure safe delivery.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Seller Info */}
        {seller && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Seller Information</h2>
            <SellerProfileWidget seller={seller} showMessageButton={true} />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
