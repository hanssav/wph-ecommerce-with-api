type User = {
  id: number;
  name: string;
  avatarUrl: string;
};

type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: User;
};

type Shop = {
  id: number;
  name: string;
  slug: string;
  logo: string;
  address: string;
  isActive: boolean;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
  shopId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  shop: Shop;
  reviews: Review[];
};

type ProducApitResponseId = {
  success: boolean;
  message: string;
  data: Product;
};

type ProductData = {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ProductApiResponse = {
  success: boolean;
  message: string;
  data: ProductData;
};

type ParamsProduct = { sort?: 'asc' | 'desc' };

export type {
  Category,
  Shop,
  Product,
  ProductData,
  ProductApiResponse,
  ProducApitResponseId,
  ParamsProduct,
};
