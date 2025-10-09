import { z } from 'zod';

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB

// helper: calculate size (bytes) from base64 data URL
const base64DataUrlSize = (dataUrl: string) => {
  const parts = dataUrl.split(',');
  if (parts.length < 2) return 0;
  const b64 = parts[1].replace(/\s/g, '');
  const padding = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0;
  return Math.floor((b64.length * 3) / 4) - padding;
};

const logoFileSchema = z
  .instanceof(File)
  .refine((f) => ['image/png', 'image/jpeg', 'image/webp'].includes(f.type), {
    message: 'Logo must be PNG / JPG / WEBP',
  })
  .refine((f) => f.size <= MAX_LOGO_SIZE, {
    message: 'Logo must be <= 5 MB',
  });

const logoDataUrlSchema = z
  .string()
  .regex(
    /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/,
    'Logo must be a data URL with PNG/JPEG/WEBP base64'
  )
  .refine((s) => base64DataUrlSize(s) <= MAX_LOGO_SIZE, {
    message: 'Logo base64 must be <= 5 MB',
  });

// Accept either File (browser) or base64 data URL string, or null
export const SellerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  slug: z.string().min(1, 'required').max(255),
  // logo boleh: File | data-url string | null
  logo: z.union([logoFileSchema, logoDataUrlSchema]).nullable(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'Address is required'),
  postalCode: z.string().min(1, 'Address is required'),
  isActive: z.boolean(),
});

export type SellerFormInput = z.infer<typeof SellerSchema>;
