import Image from 'next/image';
import { products, categories } from '@/lib/data';
import MenuDisplay from '@/components/menu/menu-display';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero');
  const plainCategories = categories.map(({ icon, ...rest }) => rest);

  return (
    <div className="flex flex-col">
      <section className="relative h-[40vh] md:h-[50vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Delicious coffee and pastries"
            fill
            className="object-cover"
            priority
            data-ai-hint="coffee pastries"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
            Gourmet Express
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Tu dosis diaria de delicias, lista para recoger.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <MenuDisplay allProducts={products} categories={plainCategories} />
      </div>
    </div>
  );
}
