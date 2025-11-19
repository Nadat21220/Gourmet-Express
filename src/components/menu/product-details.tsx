"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { QuantitySelector } from '../ui/quantity-selector';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const image = placeholderImages.find(p => p.id === product.imageId);
  const availableSizes = product.sizes.filter(s => s.available);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, quantity);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Agregado al carrito</span>
          </div>
        ),
        description: `${quantity} x ${product.name} (${selectedSize})`,
      });
    }
  };

  const currentPrice = product.sizes.find(s => s.name === selectedSize)?.price || 0;
  const subtotal = currentPrice * quantity;

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
      <div className="aspect-square w-full relative overflow-hidden rounded-lg shadow-lg">
        {image && (
          <Image
            src={image.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint="food item"
            priority
          />
        )}
        {product.promotion2x1 && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-lg px-4 py-2">
            ¡Oferta 2x1!
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Tamaño</h2>
          <RadioGroup
            value={selectedSize}
            onValueChange={setSelectedSize}
            className="flex gap-4"
          >
            {availableSizes.map(size => (
              <div key={size.name}>
                <RadioGroupItem
                  value={size.name}
                  id={`size-${size.name}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`size-${size.name}`}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span>{size.name}</span>
                  <span className="font-semibold">${size.price.toFixed(2)}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Cantidad</h2>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div className="sm:ml-auto">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="text-3xl font-bold">${subtotal.toFixed(2)}</p>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!selectedSize || !product.available}
          className="w-full text-lg py-7"
        >
          <ShoppingCart className="mr-2 h-6 w-6" />
          {product.available ? 'Agregar al Carrito' : 'Agotado'}
        </Button>
         {product.promotion2x1 && (
            <p className="text-center text-sm text-primary font-semibold">
              ¡Lleva 2 y paga 1 en este producto!
            </p>
          )}
      </div>
    </div>
  );
}
