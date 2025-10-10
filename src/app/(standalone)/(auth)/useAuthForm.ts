import React from 'react';
import { useUser } from '@/context/auth';
import { AuthSchema } from '@/lib/validation';
import { userService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import { useToast } from '@/context/toast';

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

  const { setUser } = useUser();
  const router = useRouter();
  const { showToast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const res = await userService.login(values);
      return res;
    },
    onSuccess: ({ data }) => {
      setUser({ token: data.token, user: data.user });
      showToast('Login successful!', 'success');
      router.push(PATH.HOME);
    },
    onError: (err: AxiosError) => {
      throw new Error(err.message);
    },
  });
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onLoginSubmit: SubmitHandler<LoginSchema> = (values) => {
    loginMutation.mutate(values);
  };

  const registerMutation = useMutation({
    mutationFn: userService.register,
    onSuccess: () => {
      showToast('Registration successful!', 'success');
      router.push(PATH.AUTH.LOGIN);
    },
  });

  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatarUrl: '',
    },
  });

  const onRegisterSubmit: SubmitHandler<RegisterSchema> = (values) => {
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      avatarUrl: values.avatarUrl || '',
    };

    registerMutation.mutate(payload);
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
