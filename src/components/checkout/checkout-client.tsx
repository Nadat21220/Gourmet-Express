"use client";

import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";

export default function CheckoutClient() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  if (cartItems.length === 0) {
    // This could be a redirect or a message
    return <p className="p-6">Tu carrito está vacío.</p>;
  }

  const subtotal = cartTotal; // promotions are already calculated in cartTotal
  const discounts = cartItems.reduce((acc, item) => {
    if (item.promotion2x1) {
      const pairs = Math.floor(item.quantity / 2);
      return acc + (pairs * item.unitPrice);
    }
    return acc;
  }, 0);
  const total = subtotal;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    console.log("Processing payment...");
    const orderId = `GS-${Date.now()}`;
    // In a real app, you would save the order to the database here.
    clearCart();
    router.push(`/order-confirmed/${orderId}`);
  };

  return (
    <form onSubmit={handlePayment}>
      <CardContent className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-headline font-semibold mb-4">Resumen del Pedido</h3>
            <div className="space-y-4">
              {cartItems.map((item) => {
                const image = placeholderImages.find(p => p.id === item.productImageId);
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      {image && <Image src={image.imageUrl} alt={item.productName} fill className="object-cover" />}
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">{item.size}</p>
                    </div>
                    <p className="font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
            <Separator className="my-6" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(subtotal + discounts).toFixed(2)}</span>
              </div>
              {discounts > 0 &&
              <div className="flex justify-between text-primary">
                <span>Descuentos</span>
                <span>-${discounts.toFixed(2)}</span>
              </div>
              }
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
             <h3 className="text-xl font-headline font-semibold mb-4">Datos de Contacto</h3>
             <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" defaultValue={user?.name} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono de Contacto</Label>
                    <Input id="phone" type="tel" defaultValue={user?.phone} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Notas especiales para tu pedido</Label>
                    <Textarea id="notes" placeholder="Ej: sin cebolla, extra servilletas..."/>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-headline font-semibold">Método de Pago</h3>
           <div className="space-y-4 rounded-lg border p-4">
             <div className="space-y-2">
                <Label htmlFor="card-number">Número de Tarjeta</Label>
                <div className="relative">
                    <Input id="card-number" placeholder="0000 0000 0000 0000" required/>
                    <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>
                </div>
             </div>
             <div className="space-y-2">
                <Label htmlFor="card-name">Nombre del Titular</Label>
                <Input id="card-name" defaultValue={user?.name} placeholder="Nombre completo" required/>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiración (MM/AA)</Label>
                    <Input id="expiry-date" placeholder="MM/AA" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required/>
                </div>
             </div>
           </div>
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4"/>
                <span>Pago seguro procesado por Stripe.</span>
           </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" size="lg" className="w-full md:w-auto md:ml-auto">Confirmar y Pagar ${total.toFixed(2)}</Button>
      </CardFooter>
    </form>
  );
}
