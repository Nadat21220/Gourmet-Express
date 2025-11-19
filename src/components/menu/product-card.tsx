import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = placeholderImages.find(p => p.id === product.imageId);
  const basePrice = product.sizes.find(s => s.available)?.price;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="aspect-square w-full relative">
            {image && (
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint="food item"
              />
            )}
            {!product.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive">Agotado</Badge>
              </div>
            )}
             {product.promotion2x1 && (
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">2x1</Badge>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl leading-tight mb-1">
           <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
         {basePrice && <p className="text-muted-foreground">Desde ${basePrice.toFixed(2)}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" disabled={!product.available}>
          <Link href={`/product/${product.slug}`}>
            Ver producto <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
