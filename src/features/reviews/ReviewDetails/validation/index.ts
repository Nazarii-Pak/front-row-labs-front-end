import { z } from 'zod';

export const ReviewFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  rating: z.number().min(1, { message: 'Rating is required' }).max(5, { message: 'Rating must be between 1 and 5' }),
  content: z.string().min(1, { message: 'Content is required' }),
  author: z.string().optional(),
});

export type ReviewFormSchemaType = z.infer<typeof ReviewFormSchema>;
