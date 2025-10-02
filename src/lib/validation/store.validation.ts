import z from 'zod';

export const CreateStoreSchema = z.object({
  name: z.string().min(1, 'name is required'),
  domain: z.string().min(1, 'domain is required'),
  city: z.string().min(1, 'city is required'),
  postalCode: z.string().min(1, 'postal code is required'),
  detailAddress: z.string().min(1, 'detail address is required'),
});

export type CreateStoreFormData = z.infer<typeof CreateStoreSchema>;
