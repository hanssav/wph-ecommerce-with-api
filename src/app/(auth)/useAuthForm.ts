import { AuthSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const loginSchema = AuthSchema.pick({
  email: true,
  password: true,
});

type LoginSchema = z.infer<typeof loginSchema>;

export const useAuthForm = () => {
  const [showEye, setShowEye] = React.useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit: SubmitHandler<LoginSchema> = (values) => {
    console.log('onSubmit clicked ', values);
  };

  return { showEye, setShowEye, loginForm, onLoginSubmit };
};
