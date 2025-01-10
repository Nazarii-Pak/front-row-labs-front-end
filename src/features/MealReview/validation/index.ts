import { z } from 'zod';
import { ReviewFormSchema } from '@/features/reviews/ReviewDetails/validation';

export const UpdatedMealReviewSchema = ReviewFormSchema.extend({
  components: z.array(
    ReviewFormSchema.extend({
      id: z.string(),
      author: z.string(),
    })
  ),
  confirm: z.boolean().refine((data) => data === true, {
    message: 'You must confirm that you have read and agree to the terms and conditions',
  }),
});

export type UpdatedMealReviewSchemaType = z.infer<typeof UpdatedMealReviewSchema>;
