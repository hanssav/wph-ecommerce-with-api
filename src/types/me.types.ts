import { Shop } from './shop.types';

type MeResponse = {
  success: boolean;
  message: string;
  data: Me;
};

type Me = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  shop: Shop;
  stats: Stats;
};

type Stats = {
  totalOrders: number;
  completedItems: number;
  hasShop: boolean;
};

export type { MeResponse, Me, Stats };
