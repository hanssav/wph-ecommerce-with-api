import { UserType } from './auth.types';

type ReviewParams = {
  page: number;
  limit: number;
  star?: number;
  q?: string;
};

type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: UserType;
};

type ReviewApiResponse = {
  success: boolean;
  message: string;
  data: {
    reviews: Review[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export type { ReviewParams, Review, ReviewApiResponse };
