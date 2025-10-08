'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PATH } from '@/constants';
import Link from 'next/link';

export default function BreadcrumbComp({
  title,
  className,
  isAdmin = false,
}: {
  title?: string;
  className?: string;
  isAdmin?: boolean;
}) {
  const href = isAdmin ? PATH.ADMIN.PRODUCT : PATH.HOME;
  const label = isAdmin ? 'Product Dashboard' : 'Home';
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>Detail</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <span className='line-clamp-1 max-w-60 lg:max-w-72'>{title}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
