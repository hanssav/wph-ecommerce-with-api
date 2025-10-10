import { z } from 'zod';

export const AuthSchema = z
  .object({
    name: z.string().min(1, 'name is required'),
    email: z.string().email('invalid email'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be at most 15 digits')
      .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
    password: z.string().min(6, 'password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'confirm password is required'),
    avatarUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof AuthSchema>;
