"use client";

import { useState, useMemo } from 'react';
import type { Product, Category } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from './product-card';
import { Search } from 'lucide-react';

interface MenuDisplayProps {
  allProducts: Product[];
  categories: Category[];
}

export default function MenuDisplay({ allProducts, categories }: MenuDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch && product.available;
    });
  }, [selectedCategory, searchQuery, allProducts]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full overflow-x-auto"
        >
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                <div className="flex items-center gap-2">
                  {category.icon && <category.icon className="h-4 w-4" />}
                  {category.name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-semibold text-lg">No se encontraron productos</h3>
          <p className="text-muted-foreground mt-2">Intenta ajustar tu búsqueda o filtros.</p>
        </div>
      )}
    </div>
  );
}
