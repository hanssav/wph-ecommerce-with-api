'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import { IMAGES } from '@/constants';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthForm } from '../useAuthForm';
import { AuthRedirectLink } from '../components/redirect-link';

const Login: React.FC = () => {
  const {
    showEye,
    setShowEye,
    loginForm: form,
    onLoginSubmit: onSubmit,
  } = useAuthForm();

  return (
    <Card className='w-full lg:max-w-[451px] mx-4 gap-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <CardHeader className='space-y-5'>
            <Image
              width={84}
              height={32}
              src={IMAGES.LOGO}
              alt='logo'
              priority
            />
            <div className='space-y-1'>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Access your account and start shopping in seconds
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} label='Email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={showEye.password ? 'text' : 'password'}
                      {...field}
                      label='Password'
                      iconPosition='right'
                      icon={showEye.password ? <Eye /> : <EyeOff />}
                      onIconClick={() =>
                        setShowEye((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
      <AuthRedirectLink
        promptText="Don't have an account?"
        href='/register'
        linkText='Register'
      />
    </Card>
  );
};

export default Login;
