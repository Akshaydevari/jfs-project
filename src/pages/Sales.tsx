import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Eye } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import UserNav from '@/components/layout/UserNav';
import { useToast } from '@/hooks/use-toast';

const Sales = () => {
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const { toast } = useToast();

  const [sales, setSales] = useState([
    { id: 'ORD-001', customer: 'John Smith', product: 'Premium Widget', quantity: 2, amount: 59.98, status: 'completed', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Sarah Johnson', product: 'Deluxe Gadget', quantity: 1, amount: 49.99, status: 'pending', date: '2024-01-15' },
    { id: 'ORD-003', customer: 'Mike Wilson', product: 'Professional Kit', quantity: 3, amount: 299.97, status: 'completed', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'Emily Davis', product: 'Standard Tool', quantity: 5, amount: 99.95, status: 'processing', date: '2024-01-14' },
    { id: 'ORD-005', customer: 'David Brown', product: 'Basic Component', quantity: 10, amount: 149.90, status: 'completed', date: '2024-01-13' },
  ]);

  const handleNewSale = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const lastOrderNum = sales.length > 0 
      ? Math.max(...sales.map(s => parseInt(s.id.split('-')[1]))) 
      : 0;
    
    const productMap: Record<string, string> = {
      'premium-widget': 'Premium Widget',
      'deluxe-gadget': 'Deluxe Gadget',
      'standard-tool': 'Standard Tool',
      'professional-kit': 'Professional Kit',
      'basic-component': 'Basic Component',
    };
    
    const newSale = {
      id: `ORD-${String(lastOrderNum + 1).padStart(3, '0')}`,
      customer: formData.get('customer') as string,
      product: productMap[selectedProduct] || selectedProduct,
      quantity: Number(formData.get('quantity')),
      amount: Number(formData.get('amount')),
      status: selectedStatus,
      date: new Date().toISOString().split('T')[0],
    };
    
    setSales([newSale, ...sales]);
    toast({
      title: "Sale Created",
      description: "New sale has been recorded successfully.",
    });
    setIsNewSaleDialogOpen(false);
    setSelectedProduct('');
    setSelectedStatus('pending');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'processing':
        return 'bg-blue-500/10 text-blue-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 w-full md:w-auto">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <h1 className="text-xl md:text-2xl font-bold ml-14 md:ml-0">Sales</h1>
            <UserNav />
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <p className="text-muted-foreground">Track your sales and orders</p>
          </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,345</div>
              <p className="text-xs text-muted-foreground">+18% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">167</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Recent Orders</CardTitle>
              <Dialog open={isNewSaleDialogOpen} onOpenChange={setIsNewSaleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Sale
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Sale</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewSale} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Customer Name</Label>
                      <Input id="customer" name="customer" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Product</Label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                        <SelectTrigger id="product">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium-widget">Premium Widget</SelectItem>
                          <SelectItem value="deluxe-gadget">Deluxe Gadget</SelectItem>
                          <SelectItem value="standard-tool">Standard Tool</SelectItem>
                          <SelectItem value="professional-kit">Professional Kit</SelectItem>
                          <SelectItem value="basic-component">Basic Component</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" name="quantity" type="number" min="1" defaultValue="1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input id="amount" name="amount" type="number" step="0.01" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus} required>
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Create Sale</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{sale.product}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>₹{sale.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)} variant="secondary">
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedSale(sale)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Sale Details Dialog */}
        <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details - {selectedSale?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Customer</Label>
                  <p className="font-medium">{selectedSale?.customer}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedSale?.date}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Product</Label>
                <p className="font-medium">{selectedSale?.product}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Quantity</Label>
                  <p className="font-medium">{selectedSale?.quantity} units</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-medium">₹{selectedSale?.amount.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedSale?.status)} variant="secondary">
                    {selectedSale?.status}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Sales;
