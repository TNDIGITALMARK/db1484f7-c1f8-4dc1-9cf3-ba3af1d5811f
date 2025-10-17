export type AuthLevel = 'community' | 'verified' | 'expert';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  images: string[];
  description: string;
  authLevel: AuthLevel;
  sellerId: string;
  category: string;
  series: string;
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: string;
}

export interface Seller {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  totalSales: number;
  joinedDate: string;
  isVerified: boolean;
  responseTime: string;
  badges: string[];
}

export interface Transaction {
  id: string;
  productName: string;
  price: number;
  soldDate: string;
  buyer: string;
}

// Mock sellers data
export const mockSellers: Seller[] = [
  {
    id: 'seller-1',
    username: 'collector_sarah_2019',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.9,
    totalSales: 347,
    joinedDate: '2019-03-15',
    isVerified: true,
    responseTime: '< 2 hours',
    badges: ['Top Seller', 'Quick Shipper', 'Trusted']
  },
  {
    id: 'seller-2',
    username: 'premium_labubu_dealer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dealer',
    rating: 5.0,
    totalSales: 892,
    joinedDate: '2018-06-20',
    isVerified: true,
    responseTime: '< 1 hour',
    badges: ['Expert Verified', 'Power Seller', 'Fast Shipping']
  },
  {
    id: 'seller-3',
    username: 'labubu_hunter_mike',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    rating: 4.7,
    totalSales: 156,
    joinedDate: '2020-11-08',
    isVerified: false,
    responseTime: '< 6 hours',
    badges: ['Active Seller', 'Responsive']
  },
  {
    id: 'seller-4',
    username: 'tokyo_collector_yuki',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
    rating: 4.8,
    totalSales: 523,
    joinedDate: '2019-08-12',
    isVerified: true,
    responseTime: '< 3 hours',
    badges: ['International Seller', 'Top Rated']
  }
];

// Mock products data
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Labubu Mystery Box Series 3 - Unopened',
    slug: 'labubu-mystery-box-series-3',
    price: 45,
    condition: 'New',
    images: ['/generated/labubu-cherry-blossom.png', '/generated/labubu-cherry-blossom.png', '/generated/labubu-cherry-blossom.png'],
    description: 'Sealed mystery box from Series 3. Guaranteed authentic from official Pop Mart retailer. Perfect condition, never opened. Comes with original packaging and authentication card.',
    authLevel: 'expert',
    sellerId: 'seller-2',
    category: 'Mystery Box',
    series: 'Series 3',
    isFeatured: true,
    views: 1247,
    likes: 89,
    createdAt: '2025-10-10T08:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Labubu Halloween Edition 2024 - Limited',
    slug: 'labubu-halloween-edition-2024',
    price: 125,
    condition: 'New',
    images: ['/generated/labubu-halloween.png', '/generated/labubu-halloween.png', '/generated/labubu-halloween.png', '/generated/labubu-halloween.png'],
    description: 'Ultra-rare Halloween 2024 limited edition. Only 500 pieces worldwide. Comes with special glow-in-dark features and exclusive packaging. Certificate of authenticity included.',
    authLevel: 'expert',
    sellerId: 'seller-2',
    category: 'Limited Edition',
    series: 'Halloween 2024',
    isFeatured: true,
    views: 3456,
    likes: 234,
    createdAt: '2025-10-12T14:30:00Z'
  },
  {
    id: 'prod-3',
    name: 'Labubu Glow in Dark Variant - Mint',
    slug: 'labubu-glow-in-dark-variant',
    price: 78,
    condition: 'New',
    images: ['/generated/labubu-glow.png', '/generated/labubu-glow.png'],
    description: 'Glow in the dark special variant. Mint condition, displayed in smoke-free environment. All original accessories included. Ships with protective packaging.',
    authLevel: 'verified',
    sellerId: 'seller-1',
    category: 'Special Variant',
    series: 'Glow Collection',
    isFeatured: true,
    views: 892,
    likes: 67,
    createdAt: '2025-10-08T10:15:00Z'
  },
  {
    id: 'prod-4',
    name: 'Labubu Cherry Blossom - Spring Series',
    slug: 'labubu-cherry-blossom-spring',
    price: 85,
    condition: 'Like New',
    images: ['/generated/labubu-cherry-blossom.png', '/generated/labubu-cherry-blossom.png', '/generated/labubu-cherry-blossom.png'],
    description: 'Beautiful cherry blossom edition from Spring 2024 series. Like new condition, minimal handling. Comes with original box and accessories. Perfect for collectors.',
    authLevel: 'verified',
    sellerId: 'seller-4',
    category: 'Seasonal',
    series: 'Spring 2024',
    isFeatured: false,
    views: 567,
    likes: 43,
    createdAt: '2025-10-05T16:20:00Z'
  },
  {
    id: 'prod-5',
    name: 'Labubu Gold Edition - Limited 100pc',
    slug: 'labubu-gold-edition-limited',
    price: 299,
    condition: 'New',
    images: ['/generated/labubu-gold.png', '/generated/labubu-gold.png', '/generated/labubu-gold.png', '/generated/labubu-gold.png'],
    description: 'Extremely rare gold edition, limited to only 100 pieces worldwide. Numbered certificate #47. Never removed from original packaging. Investment-grade collectible.',
    authLevel: 'expert',
    sellerId: 'seller-2',
    category: 'Ultra Rare',
    series: 'Precious Metals',
    isFeatured: true,
    views: 5234,
    likes: 456,
    createdAt: '2025-10-14T09:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Labubu Pastel Dreams Set (3pc)',
    slug: 'labubu-pastel-dreams-set',
    price: 165,
    condition: 'New',
    images: ['/generated/labubu-mystery-box.png', '/generated/labubu-mystery-box.png'],
    description: 'Complete set of 3 Labubu pastel variants: Pink Cloud, Blue Sky, and Lavender Dream. All in original packaging. Perfect starter collection or gift set.',
    authLevel: 'verified',
    sellerId: 'seller-1',
    category: 'Set',
    series: 'Pastel Collection',
    isFeatured: false,
    views: 1123,
    likes: 98,
    createdAt: '2025-10-11T11:45:00Z'
  },
  {
    id: 'prod-7',
    name: 'Labubu Ocean Wave - Translucent Blue',
    slug: 'labubu-ocean-wave-translucent',
    price: 92,
    condition: 'New',
    images: ['/generated/labubu-ocean.png', '/generated/labubu-ocean.png', '/generated/labubu-ocean.png'],
    description: 'Stunning translucent blue ocean wave edition. Features beautiful gradient coloring. Mint in sealed box with all documentation. Summer collection favorite.',
    authLevel: 'community',
    sellerId: 'seller-3',
    category: 'Translucent',
    series: 'Ocean Collection',
    isFeatured: false,
    views: 678,
    likes: 52,
    createdAt: '2025-10-09T13:30:00Z'
  },
  {
    id: 'prod-8',
    name: 'Labubu Midnight Stars - Glitter Special',
    slug: 'labubu-midnight-stars-glitter',
    price: 68,
    condition: 'Like New',
    images: ['/generated/labubu-mystery-box.png', '/generated/labubu-mystery-box.png'],
    description: 'Special glitter variant with midnight stars theme. Displayed briefly, like new condition. All original packaging and accessories included.',
    authLevel: 'community',
    sellerId: 'seller-3',
    category: 'Special Variant',
    series: 'Galaxy Collection',
    isFeatured: false,
    views: 445,
    likes: 34,
    createdAt: '2025-10-07T15:00:00Z'
  },
  {
    id: 'prod-9',
    name: 'Labubu Winter Wonderland - Ice Edition',
    slug: 'labubu-winter-wonderland-ice',
    price: 110,
    condition: 'New',
    images: ['/generated/labubu-winter.png', '/generated/labubu-winter.png', '/generated/labubu-winter.png'],
    description: 'Rare winter 2024 ice edition with frosted finish. Limited regional release. Brand new in box with certificate. Ships internationally with tracking.',
    authLevel: 'verified',
    sellerId: 'seller-4',
    category: 'Seasonal',
    series: 'Winter 2024',
    isFeatured: true,
    views: 1567,
    likes: 123,
    createdAt: '2025-10-13T12:00:00Z'
  },
  {
    id: 'prod-10',
    name: 'Labubu Sweet Candy - Pink Variant',
    slug: 'labubu-sweet-candy-pink',
    price: 55,
    condition: 'Good',
    images: ['/generated/labubu-mystery-box.png', '/generated/labubu-mystery-box.png'],
    description: 'Adorable pink candy variant from Series 2. Good condition with minor shelf wear on box. Figure is perfect. Great entry piece for new collectors.',
    authLevel: 'community',
    sellerId: 'seller-1',
    category: 'Standard',
    series: 'Series 2',
    isFeatured: false,
    views: 334,
    likes: 28,
    createdAt: '2025-10-06T14:15:00Z'
  },
  {
    id: 'prod-11',
    name: 'Labubu Cosmic Rainbow - Holographic',
    slug: 'labubu-cosmic-rainbow-holographic',
    price: 145,
    condition: 'New',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    description: 'Stunning holographic rainbow finish with color-shifting effects. Limited collaboration piece. Sealed in original packaging with authentication.',
    authLevel: 'expert',
    sellerId: 'seller-2',
    category: 'Collaboration',
    series: 'Cosmic Series',
    isFeatured: true,
    views: 2345,
    likes: 187,
    createdAt: '2025-10-15T10:30:00Z'
  },
  {
    id: 'prod-12',
    name: 'Labubu Forest Guardian - Green Edition',
    slug: 'labubu-forest-guardian-green',
    price: 72,
    condition: 'Like New',
    images: ['/generated/labubu-mystery-box.png', '/generated/labubu-mystery-box.png'],
    description: 'Beautiful forest green edition with leaf details. Like new, briefly displayed. Comes with original stand and accessories. Nature collection highlight.',
    authLevel: 'verified',
    sellerId: 'seller-4',
    category: 'Themed',
    series: 'Nature Collection',
    isFeatured: false,
    views: 556,
    likes: 41,
    createdAt: '2025-10-04T09:45:00Z'
  }
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    productName: 'Labubu Cherry Blossom',
    price: 85,
    soldDate: '2025-10-16T14:30:00Z',
    buyer: 'collector_lisa'
  },
  {
    id: 'tx-2',
    productName: 'Labubu Limited Gold Edition',
    price: 250,
    soldDate: '2025-10-15T11:20:00Z',
    buyer: 'premium_buyer_88'
  },
  {
    id: 'tx-3',
    productName: 'Labubu Halloween Special',
    price: 120,
    soldDate: '2025-10-14T16:45:00Z',
    buyer: 'tokyo_fan_2024'
  },
  {
    id: 'tx-4',
    productName: 'Labubu Mystery Box Series 2',
    price: 42,
    soldDate: '2025-10-13T10:15:00Z',
    buyer: 'new_collector_amy'
  },
  {
    id: 'tx-5',
    productName: 'Labubu Glow in Dark',
    price: 75,
    soldDate: '2025-10-12T13:00:00Z',
    buyer: 'night_owl_collector'
  }
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getSellerById(id: string): Seller | undefined {
  return mockSellers.find(s => s.id === id);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter(p => p.isFeatured);
}

export function getProductsBySeller(sellerId: string): Product[] {
  return mockProducts.filter(p => p.sellerId === sellerId);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.series.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

export function filterProducts(filters: {
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  authLevel?: AuthLevel;
  category?: string;
}): Product[] {
  return mockProducts.filter(p => {
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.condition && p.condition !== filters.condition) return false;
    if (filters.authLevel && p.authLevel !== filters.authLevel) return false;
    if (filters.category && p.category !== filters.category) return false;
    return true;
  });
}

export const categories = [
  'All',
  'Mystery Box',
  'Limited Edition',
  'Special Variant',
  'Seasonal',
  'Set',
  'Translucent',
  'Themed',
  'Standard',
  'Ultra Rare',
  'Collaboration'
];

export const authLevelInfo = {
  community: {
    label: 'Community Verified',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Verified by community members with good standing'
  },
  verified: {
    label: 'Platform Verified',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Authenticated by our internal verification team'
  },
  expert: {
    label: 'Expert Authenticated',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Certified authentic by professional authenticators'
  }
};
