import { Category } from './category.types';
import { Shop } from './shop.types';

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

type ParamsProduct = {
  order?: 'asc' | 'desc';
  categgoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'newest' | 'rating' | 'price' | 'popular';
  page?: number;
  limit?: number;
};

type ParamsSellerProduct = {
  q?: string;
  isActive?: boolean;
  page: number;
  limit: number;
};

export type {
  Review,
  Product,
  ProductData,
  ProductApiResponse,
  ProducApitResponseId,
  ParamsProduct,
  ParamsSellerProduct,
};
