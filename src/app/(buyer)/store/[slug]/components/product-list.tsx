import ProductCard from '@/components/container/product-card';
import { Product, Shop } from '@/types';
import React from 'react';

const ProductListSection: React.FC<{ products: Product[]; shop: Shop }> = ({
  products,
  shop,
}) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 pt-4 pb-2'>
      {products?.map((product: Product, idx: number) => {
        const productWithShop = { ...product, shop };
        return <ProductCard key={idx} product={productWithShop} />;
      })}
    </div>
  );
};

export default ProductListSection;
