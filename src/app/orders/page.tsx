"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { orders } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Package, CheckCircle, History } from "lucide-react";

export default function OrdersPage() {
  const { user, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !user) {
      router.push("/login");
    }
  }, [user, isInitializing, router]);

  if (isInitializing || !user) {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <div className="space-y-8">
                <Skeleton className="h-10 w-1/3" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
      </div>
    );
  }

  const currentOrder = orders[0];
  const pastOrders = orders.slice(1);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="space-y-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Mis Pedidos</h1>
            <p className="mt-2 text-muted-foreground">Rastrea tu pedido actual y revisa tu historial.</p>
        </div>

        <Card className="border-primary border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span>Pedido en Curso</span>
            </CardTitle>
            <CardDescription>
              Este es el estado actual de tu pedido más reciente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-lg bg-muted p-4">
                <div>
                    <p className="font-mono text-primary font-bold">{currentOrder.id}</p>
                    <p className="text-sm text-muted-foreground">Total: <span className="font-semibold">${currentOrder.total.toFixed(2)}</span></p>
                </div>
                <Button asChild>
                    <Link href={`/orders/${currentOrder.id}`}>Rastrear Pedido</Link>
                </Button>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Estado:</span>
                <span className="capitalize text-primary font-medium">{currentOrder.status.replace('_', ' ')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <History className="h-6 w-6" />
                    Historial de Pedidos
                </CardTitle>
                <CardDescription>
                    Aquí puedes ver todos tus pedidos anteriores.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {pastOrders.length > 0 ? (
                    <div className="space-y-4">
                        {pastOrders.map(order => (
                             <div key={order.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
                                <div>
                                    <p className="font-semibold">{order.id}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(order.timestamps.recibido!).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                     <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                                     <Button variant="outline" size="sm" asChild>
                                        <Link href={`/orders/${order.id}`}>Ver Detalles</Link>
                                     </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-8">No tienes pedidos anteriores.</p>
                )}
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
