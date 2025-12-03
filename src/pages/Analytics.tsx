import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import UserNav from '@/components/layout/UserNav';

const Analytics = () => {
  const metrics = [
    { label: 'Revenue', value: '₹1,24,563', change: '+12.5%', isPositive: true },
    { label: 'Orders', value: '3,421', change: '+8.2%', isPositive: true },
    { label: 'Avg Order Value', value: '₹36.42', change: '-2.4%', isPositive: false },
    { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', isPositive: true },
  ];

  const topProducts = [
    { name: 'Premium Widget', sales: 234, revenue: '₹7,018' },
    { name: 'Professional Kit', sales: 187, revenue: '₹18,681' },
    { name: 'Deluxe Gadget', sales: 156, revenue: '₹7,798' },
    { name: 'Standard Tool', sales: 143, revenue: '₹2,858' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 w-full md:w-auto">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <h1 className="text-xl md:text-2xl font-bold ml-14 md:ml-0">Analytics</h1>
            <UserNav />
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <p className="text-muted-foreground">Monitor your performance metrics</p>
          </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {metric.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm ${
                      metric.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <span className="font-semibold">{product.revenue}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: 'Electronics', percentage: 42, color: 'bg-blue-500' },
                  { category: 'Accessories', percentage: 28, color: 'bg-green-500' },
                  { category: 'Tools', percentage: 18, color: 'bg-yellow-500' },
                  { category: 'Components', percentage: 12, color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
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

export default Analytics;
