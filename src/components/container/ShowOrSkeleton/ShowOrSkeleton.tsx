import React, { ReactNode } from 'react';

interface SingleProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
  data?: never;
  skeletonCount?: never;
  Skeleton?: never;
}

interface ListProps<T> {
  isLoading: boolean;
  skeletonCount?: number;
  Skeleton: React.ComponentType<{ idx: number; length: number }>;
  data: T[];
  children: (item: T, idx: number, length: number) => ReactNode;
  skeleton?: never;
}

type ShowOrSkeletonProps<T = any> = SingleProps | ListProps<T>;

export default function ShowOrSkeleton<T = any>(props: ShowOrSkeletonProps<T>) {
  const { isLoading } = props;

  if ('data' in props && props.data !== undefined) {
    const { skeletonCount = 3, Skeleton, data, children } = props;

    if (isLoading) {
      return (
        <>
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <Skeleton
              key={`skeleton-${idx}`}
              idx={idx}
              length={skeletonCount}
            />
          ))}
        </>
      );
    }

    return <>{data.map((item, idx) => children(item, idx, data.length))}</>;
  }

  const { skeleton, children } = props as SingleProps;
  return isLoading ? skeleton : children;
}
