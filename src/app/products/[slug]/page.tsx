import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductDetailClient from '@/components/products/ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Mom’s Secret Spices',
    };
  }

  return {
    title: `${product.name} | Mom’s Secret Spices`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Stone-Ground Indian Spices`,
      description: product.tagline,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
