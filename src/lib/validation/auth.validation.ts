import { z } from 'zod';

export const AuthSchema = z
  .object({
    name: z.string().min(1, 'name is required'),
    email: z.string().email('invalid email'),
    password: z.string().min(6, 'password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof AuthSchema>;
