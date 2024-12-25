import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Reviews from '../features/reviews';
import Layout from '@/app/(reviews)/layout';
import { createMockRouter, mockReviews } from '../utils/test_utils';
import { CommonStoreProvider } from '@/Providers/commonStoreProvider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  })),

  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'myParam') return 'testValue';
      return null;
    }),
  })),
}));

const renderWithProviders = (ui: React.ReactNode) => {
  render(
    <CommonStoreProvider>
      <Layout>{ui}</Layout>
    </CommonStoreProvider>
  );
};

describe('Review List Page', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(createMockRouter());
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    cleanup();
    document.body.removeChild(container);
  });

  it('renders the review list with correct data', () => {
    render(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders the review list with no correct data', () => {
    render(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);
    expect(screen.queryByText('Tom')).not.toBeInTheDocument();
  });

  it('renders the review list with no reviews found', () => {
    render(<Reviews reviews={[]} total={0} page={1} />);
    expect(screen.getByText('No reviews found')).toBeInTheDocument();
  });

  it('renders the Add Review link', () => {
    renderWithProviders(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);
    const linkElement = screen.getByRole('link', { name: /add review/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/reviews/new');
  });

  it('renders the RatingFilter and SearchComponent', () => {
    renderWithProviders(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);
    expect(screen.getByTestId('rating-filter')).toBeInTheDocument();
  });

  it('updates the URL with the selected rating', () => {
    const pushMock = jest.fn();
    const mockSearchParams = new URLSearchParams();

    // Mock `useSearchParams` and `useRouter`
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    renderWithProviders(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);

    const select = screen.getByTestId('rating-filter');

    fireEvent.change(select, { target: { value: '3' } });

    // Expect `router.push` to be called with updated query params
    expect(pushMock).toHaveBeenCalledWith('?rating=3&page=1');
  });

  it('updates the URL with the selected search', async () => {
    const pushMock = jest.fn();
    const mockSearchParams = new URLSearchParams();

    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    renderWithProviders(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input).toHaveValue('test');

    await waitFor(
      () => {
        expect(pushMock).toHaveBeenCalledWith('?search=test&page=1');
      },
      { timeout: 1000 }
    );
  });

  it('renders the AuthorsFilter', () => {
    renderWithProviders(<Reviews reviews={mockReviews} total={mockReviews.length} page={1} />);
    expect(screen.getByTestId('author-filter')).toBeInTheDocument();
    expect(screen.getByTestId('author-filter')).toHaveValue('');
  });
});
