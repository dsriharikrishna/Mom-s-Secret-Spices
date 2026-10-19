import React from 'react';
import { Metadata } from 'next';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata: Metadata = {
  title: "The Spice Collection (27) | Mom's Secret Spices",
  description:
    'Explore all 27 freshly stone-ground Indian spices, regional heirlooms, and gourmet seasonings crafted by Akshaya Foods.',
};

export default function ProductsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <ProductCatalog />
    </div>
  );
}
