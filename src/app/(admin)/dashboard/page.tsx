import { Card } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import TypographyTitle from '@/components/ui/typography/Title';
import DASHBOARD_CONSTANT from '@/constants/dashboard';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='h-full flex flex-col gap-3'>
      <TypographyTitle label='Dashboard' />
      <div className='flex flex-col lg:flex-row gap-2 lg:gap-3'>
        {DASHBOARD_CONSTANT.map(({ title, data, Icon }, idx) => (
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
    </div>
  );
};

export default Dashboard;
