"use client";

import { useState, useEffect } from 'react';
import type { Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ChefHat, Package, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

interface OrderStatusTrackerProps {
  initialOrder: Order;
}

const statusMap: Record<OrderStatus, { title: string; icon: React.ElementType; step: number }> = {
  recibido: { title: 'Pedido Recibido', icon: CheckCircle, step: 1 },
  en_preparacion: { title: 'En Preparación', icon: ChefHat, step: 2 },
  listo: { title: 'Listo para Recoger', icon: Package, step: 3 },
  entregado: { title: 'Entregado', icon: PackageCheck, step: 4 },
};

export default function OrderStatusTracker({ initialOrder }: OrderStatusTrackerProps) {
  const [order, setOrder] = useState(initialOrder);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Mocking real-time updates for order status
    const timeouts = [
      setTimeout(() => setOrder(prev => ({ ...prev, status: 'en_preparacion' })), 5000),
      setTimeout(() => setOrder(prev => ({ ...prev, status: 'listo' })), 15000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (order.status === 'entregado' || order.status === 'listo' || !order.timestamps.recibido) {
      setTimeLeft(0);
      return;
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const endTime = order.timestamps.recibido! + (25 * 60 * 1000); // 25 minutes
      const remaining = Math.max(0, endTime - now);
      setTimeLeft(remaining);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [order.status, order.timestamps.recibido]);
  

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  const currentStep = statusMap[order.status].step;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Seguimiento de Pedido</CardTitle>
        <CardDescription>Pedido #{order.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center p-6 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">Tiempo de preparación restante</p>
            <p className={cn(
                "text-5xl font-bold font-mono tracking-tight",
                timeLeft < 5 * 60 * 1000 && timeLeft > 0 ? "text-destructive" : "text-primary"
            )}>
                {timeLeft > 0 ? formatTime(timeLeft) : '00:00'}
            </p>
        </div>

        <div>
            <div className="flex justify-between items-center relative mb-8">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2"/>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
                {Object.entries(statusMap).map(([status, { title, icon: Icon, step }]) => (
                    <div key={status} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-500",
                            step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <span className={cn(
                            "text-xs text-center font-semibold",
                             step <= currentStep ? 'text-primary' : 'text-muted-foreground'
                        )}>{title}</span>
                    </div>
                ))}
            </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Detalles del Pedido</h3>
          <div className="space-y-4">
            {order.items.map((item) => {
              const image = placeholderImages.find(p => p.id === item.productImageId);
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    {image && <Image src={image.imageUrl} alt={item.productName} fill className="object-cover" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.quantity}x {item.productName}</p>
                    <p className="text-sm text-muted-foreground">{item.size}</p>
                  </div>
                  <p className="font-semibold">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
             <div className="font-bold flex justify-between pt-2 border-t text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
