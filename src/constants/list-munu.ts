import {
  LayoutDashboard,
  ListOrdered,
  LucideIcon,
  Settings,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { PATH } from './path';

type ListDashboardMenus = {
  label: string;
  icon: LucideIcon;
  path: string;
};
const listDashboardMenus: ListDashboardMenus[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: PATH.ADMIN.DASHBOARD,
  },
  {
    label: 'Products',
    icon: ShoppingBag,
    path: PATH.ADMIN.PRODUCT,
  },
  {
    label: 'Order List',
    icon: ListOrdered,
    path: PATH.ADMIN.ORDER_LIST,
  },
  {
    label: 'Reviews',
    icon: Star,
    path: PATH.ADMIN.REVIEW,
  },
  {
    label: 'Settings',
    icon: Settings,
    path: PATH.ADMIN.SETTING,
  },
];

export { listDashboardMenus, type ListDashboardMenus };
