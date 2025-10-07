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
    data: 128,
    Icon: ShoppingBag,
  },
  {
    title: 'Total Orders',
    data: 342,
    Icon: ClipboardList,
  },
  {
    title: 'Total Revenue',
    data: 'Rp1.920.000',
    Icon: CircleDollarSign,
  },
  {
    title: 'Completed Orders',
    data: 298,
    Icon: CheckCircle,
  },
];

export default DASHBOARD_CONSTANT;
