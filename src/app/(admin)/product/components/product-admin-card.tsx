import { Card } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { formatMoney } from '@/lib/utils';
import { Product } from '@/types';
import React from 'react';
import ButtonActions from './button-actions';
import ProductInfo from './product-info';

const ProductAdminCard: React.FC<{ product: Product }> = ({ product = {} }) => {
  if (!product) return;
  const { title, category, price = 0, stock, images = [] } = product;

  return (
    <Card className='flex flex-col gap-3 p-3 lg:hidden'>
      <ProductInfo
        images={images}
        title={title}
        categoryName={category?.name}
      />
      <div className='flex gap-[10px] py-3 border-b'>
        <div className='flex-1'>
          <Typography size={{ base: 'sm' }} weight='bold'>
            Price
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className='text-neutral-600 leading-tight'
          >
            {formatMoney(price)}
          </Typography>
        </div>
        <div className='flex-1'>
          <Typography size={{ base: 'sm' }} weight='bold'>
            Stock
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className='text-neutral-600 leading-tight'
          >
            {stock}
          </Typography>
        </div>
      </div>
      <div className='flex gap-[10px] py-3 justify-between'>
        <Typography size={{ base: 'sm' }} weight='semibold'>
          {'Action'}
        </Typography>
        <ButtonActions id={product.id} />
      </div>
    </Card>
  );
};

export default ProductAdminCard;
