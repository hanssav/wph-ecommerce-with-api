export type SellerCount = {
  products: number;
  orderItems: number;
};

export type SellerData = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  address: string;
  isActive: boolean;
  createdAt: string;
  _count: SellerCount;
};

export type SellerResponse = {
  success: boolean;
  message: string;
  data: SellerData;
};

type Status =
  | 'ALL'
  | 'NEW'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'CONFIRMED';

export type GetAllOrderSellerParams = {
  page: number;
  limit: number;
  status?: Status;
  q?: string;
  date?: Date | undefined;
};

export type OrderItemBySeller = {
  id: number;
  orderId: number;
  code: string;
  productId: number;
  qty: number;
  priceSnapshot: number;
  status: Status;
  product: {
    id: number;
    title: string;
    images: string[];
  };
  createdAt: string;
  buyer: {
    name: string;
    phone: string;
  };
  shipping: {
    method: string;
    address: string;
    city: string;
    postalCode: string;
  };
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type OrderItemsData = {
  items: OrderItemBySeller[];
  pagination: Pagination;
};

export type GetAllOrderSellerResponse = {
  success: boolean;
  message: string;
  data: OrderItemsData;
};
