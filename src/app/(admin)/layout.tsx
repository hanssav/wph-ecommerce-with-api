import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { userService } from '@/services';
import LayoutClient from './client';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: () => userService.getMe(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutClient>{children}</LayoutClient>
    </HydrationBoundary>
  );
}
