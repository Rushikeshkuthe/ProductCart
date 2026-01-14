"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
        Failed to load product
      </h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="mt-4 rounded bg-black dark:bg-gray-800 px-4 py-2 text-white hover:bg-gray-800 dark:hover:bg-gray-700"
      >
        Try again
      </button>
    </div>
  );
}
