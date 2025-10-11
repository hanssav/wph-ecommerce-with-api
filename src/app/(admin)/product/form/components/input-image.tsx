import { ProductFormInput } from '@/lib/validation/product.validation';
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

const InputImage: React.FC<{
  field: ControllerRenderProps<ProductFormInput, 'images'>;
}> = ({ field }) => {
  return (
    <div className='grid grid-cols-3 lg:grid-cols-5 gap-4'>
      {field.value &&
        field.value.length > 0 &&
        field.value.map((img, index) => (
          <div
            key={index}
            className='relative border-2 border-gray-300 rounded-lg overflow-hidden group'
          >
            <div className='relative h-full w-full overflow-hidden'>
              <Image
                src={img instanceof File ? URL.createObjectURL(img) : img}
                alt={`Preview ${index + 1}`}
                fill
                priority
                sizes='40px'
                className='object-cover'
                unoptimized
              />
            </div>
            <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none' />

            <div className='absolute inset-0 opacity-100 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-2 z-10 py-2'>
              <label
                htmlFor={`reupload-${index}`}
                className='cursor-pointer text-white bg-black/50 rounded-md p-2 shadow-lg'
                title='Reupload'
              >
                <Upload className='' />
                <input
                  id={`reupload-${index}`}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const newImages = [...(field.value || [])];
                        newImages[index] = reader.result as string;
                        field.onChange(newImages);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <button
                type='button'
                onClick={() => {
                  const newImages = (field.value || []).filter(
                    (_, i) => i !== index
                  );
                  field.onChange(newImages);
                }}
                className='cursor-pointer text-white bg-black/50 rounded-md p-2 shadow-lg'
                title='Delete'
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}

      {/* Add new image button */}
      {(!field.value || field.value.length < 5) && (
        <label
          htmlFor={field.name}
          className='aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors'
        >
          <svg
            className='w-8 h-8 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg>

          <span className='text-xs text-gray-500 mt-2'>Add Image</span>
          <input
            id={field.name}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const newImages = [
                    ...(field.value || []),
                    reader.result as string,
                  ];
                  field.onChange(newImages);
                };
                reader.readAsDataURL(file);
              }
              e.target.value = '';
            }}
          />
        </label>
      )}
    </div>
  );
};

export default InputImage;
