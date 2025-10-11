import {
  ShoppingBag,
  ClipboardList,
  CheckCircle,
  CircleDollarSign,
  LucideIcon,
} from 'lucide-react';

const DASHBOARD_CONSTANT: {
  title: string;
  data: number | string;
  Icon: LucideIcon;
}[] = [
  {
    title: 'Total Products',
    data: 0,
    Icon: ShoppingBag,
  },
  {
    title: 'Total Orders',
    data: 0,
    Icon: ClipboardList,
  },
  {
    title: 'Total Revenue',
    data: 0,
    Icon: CircleDollarSign,
  },
  {
    title: 'Completed Orders',
    data: 0,
    Icon: CheckCircle,
  },
];

export default DASHBOARD_CONSTANT;
