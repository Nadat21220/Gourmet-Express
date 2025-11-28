import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { orders } from '@/lib/data';

export default function OrderConfirmedPage({ params }: { params: { id: string } }) {
  const order = orders.find(o => o.id === params.id);

  if (!order) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader className="items-center">
            <XCircle className="mb-4 h-16 w-16 text-destructive" />
            <CardTitle className="font-headline text-3xl">Pedido no encontrado</CardTitle>
            <CardDescription>No pudimos encontrar un pedido con este número. Por favor, verifica el ID o contacta a soporte.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Volver al Menú</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const orderId = params.id;

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="items-center">
          <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
          <CardTitle className="font-headline text-3xl">¡Pedido confirmado!</CardTitle>
          <CardDescription>Gracias por tu compra. Ya estamos preparando tu pedido.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Número de Pedido</p>
            <p className="font-mono text-lg font-bold text-primary">{orderId}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>Tiempo estimado de preparación: <strong>25 Minutos</strong></span>
          </div>
           <div className="border-t pt-4">
              <h4 className="mb-2 font-semibold">Resumen del Pedido</h4>
              <div className="space-y-1 text-left text-sm">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.productName} ({item.size})</span>
                    <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Total Pagado</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
           </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button asChild className="w-full">
            <Link href={`/orders/${orderId}`}>Rastrear mi Pedido</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Volver al Menú</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
