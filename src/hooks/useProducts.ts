'use client';

import { useQuery } from '@tanstack/react-query';
import { PRODUCTS, Product, ProductCategory } from '@/data/products';

// Mock service layer for TanStack Query (no backend required, leverages local master catalog with caching & filtering)
export function useProducts(category?: ProductCategory | 'all') {
  return useQuery({
    queryKey: ['products', category || 'all'],
    queryFn: async () => {
      // Simulate micro-async resolution to populate query cache
      await new Promise((r) => setTimeout(r, 50));
      if (!category || category === 'all') {
        return PRODUCTS;
      }
      return PRODUCTS.filter((p) => p.category === category);
    },
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 50));
      const found = PRODUCTS.find((p) => p.slug === slug);
      if (!found) throw new Error(`Product not found: ${slug}`);
      return found;
    },
    enabled: Boolean(slug),
  });
}

