import Reviews from '@/features/reviews';
import { getReviews } from '@/services/reviews';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string; page_size: string; rating: string; author: string }>;
}) {
  const params = await searchParams;

  const res = await getReviews({
    page: Number(params.page),
    search: params.search,
    page_size: Number(params.page_size),
    rating: Number(params.rating),
    author: params.author,
  });

  return <Reviews reviews={res.reviews} total={res.total} page={res.page} />;
}
