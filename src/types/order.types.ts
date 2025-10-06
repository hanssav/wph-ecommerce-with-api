import { Product } from './product.types';
import { Shop } from './shop.types';

type OrdersResponse = {
  success: boolean;
  message: string;
  data: OrdersData;
};

type OrdersData = {
  orders: Order[];
  pagination: Pagination;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type Order = {
  id: number;
  code: string;
  paymentStatus: string;
  address: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

type OrderItem = {
  id: number;
  productId: number;
  shopId: number;
  qty: number;
  priceSnapshot: number;
  status: string;
  product: Product;
  shop: Shop;
};

type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'ALL';
type GetOrdersMyParam = {
  page: number;
  limit: number;
  paymentStatus?: PaymentStatus;
};

export type {
  OrdersResponse,
  OrdersData,
  Pagination,
  Order,
  OrderItem,
  GetOrdersMyParam,
};
