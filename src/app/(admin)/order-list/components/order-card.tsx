import { Badge, BadgeVariant } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { cn, formatDate, formatMoney } from '@/lib/utils';
import { OrderItemBySeller } from '@/types';
import Image from 'next/image';
import React from 'react';
import { useOrder } from '../useOrder';
import ButtonAction from './button-actions';
import CardSection from './card-section';

const OrderCard: React.FC<{ order: OrderItemBySeller }> = ({ order }) => {
  const { badgeVariant, accStatus, setDelivered, setAccept, setReject } =
    useOrder(order);

  return (
    <Card>
      <CardContent className='space-y-3'>
        <div className='flex flex-col lg:flex-row  gap-1.5 border-b border-neutral-300 pb-3'>
          <Badge
            variant={badgeVariant as BadgeVariant['variant']}
            className='font-semibold'
          >
            {accStatus}
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
            setDelivered={setDelivered}
            setReject={setReject}
            setAccept={setAccept}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
