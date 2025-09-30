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

type RegisterSchema = z.infer<typeof AuthSchema>;

export type ShowEyeType = { password: boolean; confirmPassword: boolean };

export const useAuthForm = () => {
  const [showEye, setShowEye] = React.useState<ShowEyeType>({
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
    console.info('onSubmit clicked ', values);
  };

  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onRegisterSubmit: SubmitHandler<RegisterSchema> = (values) => {
    console.info('onSubmit register onClick ', values);
  };

  return {
    showEye,
    setShowEye,
    loginForm,
    onLoginSubmit,
    registerForm,
    onRegisterSubmit,
  };
};
