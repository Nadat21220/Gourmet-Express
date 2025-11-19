import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/menu/product-details';

export async function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <ProductDetails product={product} />
    </div>
  );
}
