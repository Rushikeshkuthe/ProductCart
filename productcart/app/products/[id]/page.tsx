import Image from "next/image";
import { fetchProductById } from "@/app/lib/api";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const product = await fetchProductById(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4 py-10 text-gray-900 dark:text-gray-100 transition-colors">
      
      <div className="mx-auto max-w-6xl rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-10 shadow-lg animate-fade-in">
        <div className="grid gap-10 md:grid-cols-2">

          {/* Image Section */}
          <div className="relative flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900 p-6">
            <div className="relative h-80 w-full md:h-96">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Badge */}
              <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900 px-4 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">
                {product.title} 
              </h1>

              <p >⭐{product.rating.rate}</p>
              <p>🛒{product.rating.count} ratings</p>
              

              {/* Description */}
              <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="mt-8 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-5 shadow-inner">
              <div>
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400">
                  Price
                </p>
               
              </div>
               <p className="text-2xl font-bold text-gray-600 dark:text-gray-200">
                  ₹ {product.price}
                </p> 
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
