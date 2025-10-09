import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { ICONS } from '@/constants';
import { useDialog } from '@/context/dialog';
import { useToast } from '@/context/toast';
import { useUpdateSeller } from '@/hooks';
import { cn } from '@/lib/utils';
import { SellerSchema } from '@/lib/validation/seller-admin.validation';
import { SellerData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const UpdateProfileSchema = SellerSchema.pick({
  name: true,
  slug: true,
  logo: true,
});

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

const ChangeProfileDialog: React.FC<{
  logo: string | null;
  name: string;
  slug: string;
  onClose: () => void;
}> = ({ logo, name, slug, onClose }) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const { showToast } = useToast();

  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: name || '',
      slug: slug || '',
      logo: null,
    },
  });

  const { updateSeller, isPending } = useUpdateSeller();

  const onSubmit: SubmitHandler<UpdateProfileInput> = async (values) => {
    updateSeller(values, {
      onSuccess: () => {
        onClose();
        showToast('Profile updated successfully!', 'success');
      },
      onError: () => {
        showToast('Profile failed to update!', 'error');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='logo'
          render={() => (
            <FormItem>
              <FormControl>
                <div className='space-y-4 p-6 flex flex-col items-center justify-center'>
                  <div className='relative h-[6.25rem] w-[6.25rem] overflow-hidden rounded-full border border-neutral-200'>
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt='logo-preview'
                        className='object-cover w-full h-full'
                      />
                    ) : (
                      <Image
                        src={logo ?? ICONS.DEFAULT_AVATAR}
                        alt='default-avatar'
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    )}
                  </div>
                  <label
                    htmlFor='logo-upload'
                    className={cn(
                      'cursor-pointer border rounded-md px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 transition-colors',
                      isPending && 'opacity-50 pointer-events-none'
                    )}
                  >
                    Choose Profile
                  </label>
                  <input
                    id='logo-upload'
                    type='file'
                    accept='image/png,image/jpeg,image/webp'
                    className='hidden'
                    disabled={isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (preview) {
                          URL.revokeObjectURL(preview);
                        }

                        form.setValue('logo', file, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });

                        const newPreview = URL.createObjectURL(file);
                        setPreview(newPreview);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  label='Store Name'
                  autoComplete='name'
                  value={field.value ?? ''}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  autoComplete='slug'
                  label='Store Domain'
                  value={field.value ?? ''}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full rounded-md'
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
};

const ProfileContent: React.FC<Pick<SellerData, 'logo' | 'name' | 'slug'>> = ({
  logo,
  name,
  slug,
}) => {
  const { closeDialog, openDialog } = useDialog();

  return (
    <div className='flex flex-col w-full lg:max-w-1/3 lg:p-5 lg:gap-4 border rounded-md border-neutral-300 p-3 gap-[17px]'>
      <div className='space-y-1'>
        <div className='relative h-12 w-12 overflow-hidden rounded-full'>
          <Image
            src={logo ?? ICONS.DEFAULT_AVATAR}
            alt={'default-image'}
            fill
            priority
            sizes='40px'
            className='object-cover'
            unoptimized
          />
        </div>
        <div>
          <Typography size={{ base: 'sm' }} weight='semibold'>
            Store Name
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className=' text-neutral-600'
          >
            {name}
          </Typography>
        </div>
        <div>
          <Typography size={{ base: 'sm' }} weight='semibold'>
            Store Domain
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className=' text-neutral-600'
          >
            {slug}
          </Typography>
        </div>
      </div>
      <Button
        variant={'outline'}
        className='rounded-md'
        onClick={() => {
          openDialog({
            title: 'Change Profile',
            content: (
              <ChangeProfileDialog
                logo={logo}
                name={name}
                slug={slug}
                onClose={closeDialog}
              />
            ),
          });
        }}
      >
        Change Profile
      </Button>
    </div>
  );
};

export default ProfileContent;
