import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { productsService } from '@/services';
import PreviewClient from './client';

type DetailProps = {
  params: Promise<{
    id: string;
  }>;
};

const Preview = async ({ params }: DetailProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getById(id),
    staleTime: 60000,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='flex flex-col'>
      <HydrationBoundary state={dehydratedState}>
        <PreviewClient id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default Preview;
