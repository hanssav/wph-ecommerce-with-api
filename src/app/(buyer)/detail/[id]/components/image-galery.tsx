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
    validImages[0] || null
  );

  React.useEffect(() => {
    if (validImages.length) {
      setSelected(validImages[0]);
    }
  }, [validImages]);

  if (!validImages.length) return null;

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative w-full aspect-square rounded-lg overflow-hidden'>
        {selected && (
          <Image
            fill
            src={selected}
            alt={slug}
            priority
            className='object-cover'
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
