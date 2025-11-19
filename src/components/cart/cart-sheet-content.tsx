"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import { QuantitySelector } from "../ui/quantity-selector";
import { Separator } from "../ui/separator";
import AiOrderAssistance from "../ai/ai-order-assistance";

export function CartSheetContent() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h3 className="font-semibold">Tu carrito está vacío</h3>
        <p className="text-sm text-muted-foreground">
          Agrega productos para verlos aquí.
        </p>
        <Button asChild>
          <Link href="/">Explorar Menú</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="flex-1 -mx-6">
        <div className="px-6">
          {cartItems.map((item) => {
            const image = placeholderImages.find(
              (p) => p.id === item.productImageId
            );
            const itemSubtotal = item.unitPrice * item.quantity;

            return (
              <div key={item.id} className="flex items-start gap-4 py-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      data-ai-hint="food item"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.productName}</h4>
                  <p className="text-sm text-muted-foreground">{item.size}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <QuantitySelector
                      quantity={item.quantity}
                      setQuantity={(q) => updateQuantity(item.id, q)}
                    />
                    <div className="flex flex-col items-end">
                      <p className="font-semibold">
                        ${itemSubtotal.toFixed(2)}
                      </p>
                       {item.promotion2x1 && item.quantity >= 2 && (
                         <p className="text-xs text-primary line-through">${(item.unitPrice * Math.floor(item.quantity / 2)).toFixed(2)}</p>
                       )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <Separator className="my-4"/>
      <AiOrderAssistance />
      <Separator className="my-4"/>
      <div className="mt-auto border-t -mx-6 px-6 pt-6">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Los impuestos y el envío se calculan al finalizar la compra.
        </p>
        <Button asChild className="w-full mt-6" size="lg">
          <Link href="/checkout">Proceder al Pago</Link>
        </Button>
      </div>
    </>
  );
}
