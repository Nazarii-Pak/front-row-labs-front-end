import { useRouter } from 'next/router';

export function createMockRouter(overrides: Partial<ReturnType<typeof useRouter>> = {}) {
  return {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    ...overrides,
  };
}

export const mockReviews = [
  { id: '1', author: 'Alice', title: 'Review 1', rating: 4, content: 'This is a review' },
  { id: '2', author: 'Bob', title: 'Review 2', rating: 5, content: 'This is another review' },
];
