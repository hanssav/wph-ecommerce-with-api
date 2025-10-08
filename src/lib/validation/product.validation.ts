import { z } from 'zod';

export const ProductSchema = z.object({
  title: z.string().min(1, 'title is required'),
  description: z.string().min(1, 'description is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a valid number greater than 0',
    }),
  stock: z
    .string()
    .min(1, 'Stock is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Stock must be a valid number (0 or greater)',
    }),
  categoryId: z
    .number()
    .int()
    .min(1, 'Category is required')
    .optional()
    .refine((val) => val !== undefined, {
      message: 'Category is required',
    }),
  images: z.array(z.string()).optional(),
  imagesUrl: z.array(z.string().url('must be a valid URL')).optional(),
  isActive: z.boolean().optional(),
});

export type ProductFormInput = z.infer<typeof ProductSchema>;
