'use client';
import React from 'react';
import { useSeller } from '@/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddressContent, ProfileContent } from './components';

const SettingClient = () => {
  const [tabState, setTabState] = React.useState<string>('profile');
  const { seller } = useSeller();
  if (!seller) return;

  const TABS_DATA = [
    {
      value: 'profile',
      label: 'Profile',
      content: (
        <ProfileContent
          logo={seller?.logo}
          name={seller?.name}
          slug={seller?.slug}
          key={seller?.id}
        />
      ),
    },
    {
      value: 'address',
      label: 'Address',
      content: <AddressContent address={seller?.address} />,
    },
  ];

  return (
    <Tabs
      className='p-4 flex flex-col gap-4'
      value={tabState}
      onValueChange={setTabState}
    >
      <TabsList className='w-full justify-between'>
        {TABS_DATA.map(({ value: tab, label }) => (
          <TabsTrigger
            key={tab}
            value={tab}
            onClick={() => setTabState(tab)}
            data-state={tabState === tab ? 'active' : 'inactive'}
            className='rounded-none border-b-1 border-b-neutral-300 data-[state=active]:border-b-3 data-[state=active]:border-b-neutral-950 !py-5'
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS_DATA.map(({ content, value }) => (
        <TabsContent value={value} key={value}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SettingClient;
