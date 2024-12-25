export type Review = {
  id: string;
  title: string;
  rating: number;
  content: string;
  author: string;
};

export type SearchParams = {
  page?: string;
  search?: string;
  page_size?: string;
};

export type ReviewsResponse = {
  reviews: Review[];
  total: number;
  page: number;
};
