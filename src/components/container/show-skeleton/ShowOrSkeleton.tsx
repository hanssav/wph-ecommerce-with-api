import React from 'react';

type SingleProps = {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};

type ListProps<T> = {
  isLoading: boolean;
  skeletonCount?: number;
  Skeleton: React.ComponentType<{ idx: number; length: number }>;
  data: T[];
  children: (item: T, idx: number, length: number) => React.ReactNode;
};

type ShowOrSkeletonProps<T> =
  | (SingleProps & { data?: undefined; Skeleton?: undefined })
  | (ListProps<T> & { skeleton?: undefined });

export default function ShowOrSkeleton<T>(props: ShowOrSkeletonProps<T>) {
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

  const { skeleton, children } = props;
  return isLoading ? <>{skeleton}</> : <>{children}</>;
}
