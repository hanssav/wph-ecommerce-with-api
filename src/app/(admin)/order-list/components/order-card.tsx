import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { cn, formatDate, formatMoney } from '@/lib/utils';
import { OrderItemBySeller } from '@/types';
import Image from 'next/image';
import React from 'react';

const CardSection: React.FC<{
  label?: string;
  value?: string[];
  border?: boolean;
  className?: string;
}> = ({ label, value = [], border = true, className }) => {
  return (
    <div
      className={cn(
        'pb-4 w-full',
        border && 'border-b border-neutral-300',
        className
      )}
    >
      <Typography size={{ base: 'sm' }} weight='bold' className='lg:text-left '>
        {label}
      </Typography>

      <div className='flex flex-col gap-0.5'>
        {value.map((val, idx) => (
          <Typography
            key={idx}
            size={{ base: 'sm' }}
            weight='normal'
            className='leading-tight text-neutral-600 lg:text-left'
          >
            {val}
          </Typography>
        ))}
      </div>
    </div>
  );
};
type ButtonActionProps = {
  status: OrderItemBySeller['status'];
};

const ButtonAction: React.FC<ButtonActionProps> = ({ status }) => {
  const renderButtons = () => {
    switch (status) {
      case 'NEW':
        return (
          <div className='flex gap-4 w-full lg:justify-end'>
            <Button
              variant={'outline'}
              className='flex-1 rounded-md lg:max-w-40'
              // onActionA={() => console.log('Action A clicked')}
            >
              Reject Order
            </Button>
            <Button
              className='flex-1 rounded-md lg:max-w-40'
              // onActionB={() => console.log('Action B clicked')}
            >
              Accept Order
            </Button>
          </div>
        );
    }
  };

  return renderButtons();
};
const OrderCard: React.FC<{ order: OrderItemBySeller }> = ({ order }) => {
  console.log(order, 'order');
  return (
    <Card>
      <CardContent className='space-y-3'>
        <div className='flex flex-col lg:flex-row  gap-1.5 border-b border-neutral-300 pb-3'>
          <Badge variant={'outline'} className='font-semibold'>
            {order.status}
          </Badge>
          <Typography
            size={{ base: 'sm' }}
            weight={'normal'}
            className='flex items-center gap-1'
          >
            <span>{order.code}</span>
            <span className='flex items-center justify-center font-extrabold text-lg leading-none'>
              •
            </span>
            <span>{formatDate(order.createdAt)}</span>
          </Typography>
        </div>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-3 lg:border-b py-3'>
          <div
            className={
              'flex gap-[10px] py-3 border-b lg:border-b-0 lg:border-r lg:w-full border-neutral-300 pb-2'
            }
          >
            <div className='relative h-12 w-12 overflow-hidden rounded-md'>
              <Image
                src={order.product.images[0] ?? IMAGES.DEFAULT_PRODUCT_IMAGE}
                alt={'product'}
                fill
                priority
                sizes='40px'
                className='object-cover'
                unoptimized
              />
            </div>
            <div className='flex flex-col gap-3'>
              <CardSection
                label={order.product.title}
                value={[`${order.qty} x ${formatMoney(order.priceSnapshot)}`]}
                border={false}
              />
            </div>
          </div>
          <CardSection
            className='lg:border-b-0 lg:border-r lg:flex lg:flex-col lg:items-center'
            label={'Address'}
            value={[
              `${order.buyer.name} (${order.buyer.phone})`,
              `${order.shipping.address}, ${order.shipping.city}`,
            ]}
          />
          <CardSection
            className='lg:border-none lg:flex lg:flex-col lg:items-center'
            label={'Shipping'}
            value={[order.shipping.method]}
          />
        </div>
        <div className='flex flex-col lg:flex-row lg: items-center gap-3'>
          <div
            className={cn(
              'pb-3 border-b border-neutral-300 w-full lg:border-none lg:py-0'
            )}
          >
            <Typography
              size={{ base: 'sm' }}
              weight='normal'
              className='text-neutral-600'
            >
              Total Payment
            </Typography>

            <Typography size={{ base: 'sm' }} weight='bold'>
              {formatMoney(order.priceSnapshot)}
            </Typography>
          </div>

          <ButtonAction
            status={order.status}
            // onActionA={() => console.log('Action A clicked')}
            // onActionB={() => console.log('Action B clicked')}
          />
          {/* <div className='flex gap-4'>
            <Button variant={'outline'} className='flex-1 rounded-md'>
              Reject Order
            </Button>
            <Button className='flex-1 rounded-md'>Accept Order</Button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
