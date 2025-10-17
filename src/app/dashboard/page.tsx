'use client';

import { useState } from 'react';
import {
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  BarChart3,
  Clock
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockSellers, getProductsBySeller, mockTransactions } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  // Using first seller as current user
  const currentSeller = mockSellers[0];
  const sellerProducts = getProductsBySeller(currentSeller.id);
  const [selectedTab, setSelectedTab] = useState('listings');

  // Calculate stats
  const totalListings = sellerProducts.length;
  const activeListings = sellerProducts.filter(p => p.isFeatured).length;
  const totalViews = sellerProducts.reduce((sum, p) => sum + p.views, 0);
  const avgPrice = sellerProducts.reduce((sum, p) => sum + p.price, 0) / totalListings;

  // Mock sales data (showing recent transactions for demo)
  const recentSales = mockTransactions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentSeller.username}</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            List New Item
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Listings</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalListings}</div>
              <p className="text-xs text-gray-500 mt-1">{activeListings} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{currentSeller.totalSales}</div>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-blue-600 mt-1">+8% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">${avgPrice.toFixed(0)}</div>
              <p className="text-xs text-gray-500 mt-1">Across all listings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Listings</CardTitle>
                    <CardDescription>Manage your product inventory</CardDescription>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Image</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Likes</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellerProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <Link href={`/product/${product.slug}`} className="hover:text-purple-600">
                              {product.name}
                            </Link>
                            <div className="text-xs text-gray-500 mt-1">{product.series}</div>
                          </TableCell>
                          <TableCell className="font-semibold">${product.price}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {product.condition}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.views}</TableCell>
                          <TableCell>{product.likes}</TableCell>
                          <TableCell>
                            <Badge className={product.isFeatured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {product.isFeatured ? 'Active' : 'Draft'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales History Tab */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Your transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{sale.productName}</div>
                        <div className="text-sm text-gray-500">Sold to {sale.buyer}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(sale.soldDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">${sale.price}</div>
                        <Badge className="mt-2 bg-green-100 text-green-800">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Earnings</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        ${recentSales.reduce((sum, s) => sum + s.price, 0)}
                      </div>
                      <p className="text-sm text-gray-600">From {recentSales.length} recent transactions</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your store metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Conversion Rate</div>
                      <div className="text-2xl font-bold text-gray-900">3.2%</div>
                    </div>
                    <div className="text-green-600 text-sm font-semibold">+0.5%</div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Avg. Response Time</div>
                      <div className="text-2xl font-bold text-gray-900">{currentSeller.responseTime}</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Customer Rating</div>
                      <div className="text-2xl font-bold text-gray-900">{currentSeller.rating}/5.0</div>
                    </div>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                      <div className="text-2xl font-bold text-gray-900">$12,450</div>
                    </div>
                    <div className="text-green-600 text-sm font-semibold">+18%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Items</CardTitle>
                  <CardDescription>Your best sellers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sellerProducts
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((product, index) => (
                        <div key={product.id} className="flex items-center gap-4">
                          <div className="text-xl font-bold text-gray-400 w-6">
                            #{index + 1}
                          </div>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.views} views</div>
                          </div>
                          <div className="font-bold text-gray-900">${product.price}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Seller Badges</CardTitle>
                <CardDescription>Your achievements and recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {currentSeller.badges.map((badge) => (
                    <Badge
                      key={badge}
                      className="px-4 py-2 text-sm bg-purple-100 text-purple-800 border-purple-200"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
