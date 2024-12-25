'use client';
import Link from 'next/link';

// Error boundaries must be Client Components

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const message = error?.message ? 'error: "' + error?.message + '"' : 'Something went wrong!';

  return (
    <div className="flex flex-col gap-6 items-center justify-center pt-20">
      <h2 className="text-2xl font-bold">{message}</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => reset()}>
        Try again
      </button>
      <Link href="/" className="underline">
        Go to home
      </Link>
    </div>
  );
}
