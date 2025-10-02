type Category = {
  id: number;
  name: string;
  slug: string;
};

type Shop = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  category: Category;
  shop: Shop;
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
  ParamsProduct,
};
