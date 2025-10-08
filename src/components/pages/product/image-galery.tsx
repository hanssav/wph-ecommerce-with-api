'use client';

import { Product } from '@/types/product.types';
import Image from 'next/image';
import React from 'react';

const normalizeImages = (images: string[]) =>
  images.filter((img) => img && /^https?:\/\//.test(img));

const ImageGallery: React.FC<Partial<Pick<Product, 'images' | 'slug'>>> = ({
  images = [],
  slug = 'images',
}) => {
  const validImages = normalizeImages(images);

  const [selected, setSelected] = React.useState<string | null>(
    validImages.length ? validImages[0] : null
  );

  React.useEffect(() => {
    if (validImages.length && !selected) {
      setSelected(validImages[0]);
    }
  }, [validImages, selected]);

  if (!validImages.length) return null;

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative w-full aspect-square rounded-lg overflow-hidden'>
        {selected && (
          <Image
            fill
            src={selected || '/images/placeholder.png'}
            alt={slug || 'product image'}
            priority
            className='object-cover'
            sizes='(max-width: 640px) 100vw, 
             (max-width: 1024px) 50vw, 
             33vw'
          />
        )}
      </div>

      <div className='flex gap-2 overflow-x-auto'>
        {validImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(img)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
              selected === img ? 'border-neutral-950' : 'border-gray-200'
            }`}
          >
            <Image
              src={img}
              sizes='80px'
              alt={`${slug}-${idx}`}
              fill
              className='object-cover'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
