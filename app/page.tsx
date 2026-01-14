import { fetchProducts } from "./lib/api";
import ProductFilters from "@/components/ProductFilters";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      
     
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-300">
            ProductCart
          </h1>
        </div>
      </header>

  
      <div className="mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
   
        <ProductFilters products={products} />
      </div>
    </main>
  );
}
