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
import { Button } from '@/components/ui/button';
import { useAuthForm } from '../useAuthForm';
import { fields } from '../components/field';
import { FormInput } from '../components/form-input';
import { AuthRedirectLink } from '../components/redirect-link';

const Register: React.FC = () => {
  const {
    showEye,
    setShowEye,
    registerForm: form,
    onRegisterSubmit: onSubmit,
  } = useAuthForm();

  return (
    <Card className='w-full lg:max-w-[451px] mx-4 gap-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <CardHeader className='space-y-6'>
            <Image
              width={84}
              height={32}
              src={IMAGES.LOGO}
              alt='logo'
              priority
            />
            <div className='space-y-1'>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Just a few steps away from your next favorite purchase
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='space-y-3'>
            {fields.map((fieldCfg) => (
              <FormField
                key={fieldCfg.name}
                control={form.control}
                name={fieldCfg.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormInput
                        fieldCfg={fieldCfg}
                        field={field}
                        showEye={showEye}
                        setShowEye={setShowEye}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>

          <CardFooter>
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>

      <AuthRedirectLink
        promptText='Already have an account?'
        href='/login'
        linkText='Log in'
      />
    </Card>
  );
};

export default Register;
