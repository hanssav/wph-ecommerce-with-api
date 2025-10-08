type Category = {
  id: number;
  name: string;
  slug: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type CategoriesResponse = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
    pagination: Pagination;
  };
};

type CategoryParams = Partial<Pick<Pagination, 'page' | 'limit'>> & {
  q?: string;
};

export type { Category, CategoriesResponse, CategoryParams };
