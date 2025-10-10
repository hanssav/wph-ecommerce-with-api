'use client';
import { Card } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import DASHBOARD_CONSTANT from '@/constants/dashboard';
import { useInfiniteSellerProducts, useMe } from '@/hooks';
import React from 'react';

const DashboardClient = () => {
  const { user } = useMe();
  const { products } = useInfiniteSellerProducts({ page: 1, limit: 10 });

  const dashboardData = DASHBOARD_CONSTANT.map((item) => {
    if (item.title === 'Total Products' && products?.length) {
      return { ...item, data: products.length };
    }
    if (item.title === 'Total Orders' && user?.stats) {
      return { ...item, data: user.stats.totalOrders };
    }
    if (item.title === 'Completed Orders' && user?.stats) {
      return { ...item, data: user.stats.completedItems };
    }
    return item;
  });

  return (
    <div className='flex flex-col lg:flex-row gap-2 lg:gap-3'>
      {dashboardData.map(({ title, data, Icon }, idx) => (
        <Card key={idx} className='p-3 flex flex-col gap-2 lg:flex-1'>
          <Icon className='w-5 h-5' />
          <Typography weight={'normal'} size={{ base: 'sm' }}>
            {title}
          </Typography>
          <Typography weight={'bold'} size={{ base: 'xl', lg: 'display-xs' }}>
            {data}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export default DashboardClient;
