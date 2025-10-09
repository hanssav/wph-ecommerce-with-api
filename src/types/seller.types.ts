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
