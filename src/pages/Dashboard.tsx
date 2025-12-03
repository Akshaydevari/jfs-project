import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import Sidebar from '@/components/layout/Sidebar';
import UserNav from '@/components/layout/UserNav';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 31),
  });

  const salesData = [
    { date: 'Jan 1', revenue: 4200, orders: 24 },
    { date: 'Jan 5', revenue: 5300, orders: 32 },
    { date: 'Jan 10', revenue: 4800, orders: 28 },
    { date: 'Jan 15', revenue: 6100, orders: 35 },
    { date: 'Jan 20', revenue: 5500, orders: 31 },
    { date: 'Jan 25', revenue: 7200, orders: 42 },
    { date: 'Jan 31', revenue: 6800, orders: 38 },
  ];

  const productData = [
    { name: 'Electronics', value: 4500 },
    { name: 'Accessories', value: 3200 },
    { name: 'Tools', value: 2800 },
    { name: 'Kits', value: 3900 },
    { name: 'Components', value: 1800 },
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      icon: Package,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Total Sales',
      value: '₹45,231',
      icon: DollarSign,
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Orders',
      value: '342',
      icon: ShoppingCart,
      trend: '+23%',
      trendUp: true,
    },
    {
      title: 'Revenue Growth',
      value: '15.8%',
      icon: TrendingUp,
      trend: '+4%',
      trendUp: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 w-full md:w-auto">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <h1 className="text-xl md:text-2xl font-bold ml-14 md:ml-0">Dashboard</h1>
            <UserNav />
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-muted-foreground">Welcome back! Here's your inventory overview.</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {dateRange.from && dateRange.to ? (
                    `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                  ) : (
                    'Select date range'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className={stat.trendUp ? 'text-green-600' : 'text-red-600'}>
                      {stat.trend}
                    </span>{' '}
                    from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue (₹)" />
                  <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { item: 'Basic Component', stock: 12, sku: 'CMP-005' },
                  { item: 'Standard Tool', stock: 18, sku: 'TOL-003' },
                  { item: 'Deluxe Gadget', stock: 25, sku: 'GDG-002' },
                ].map((item) => (
                  <div key={item.sku} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="text-sm font-medium">{item.item}</p>
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.stock} units</span>
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                        Low Stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
