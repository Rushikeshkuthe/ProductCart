export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-8 animate-pulse">
      <div className="mx-auto max-w-5xl rounded-xl bg-white dark:bg-gray-800 p-6 shadow">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-4">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
