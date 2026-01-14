"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/product";

interface Props {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div className="relative rounded-xl bg-white dark:bg-gray-800 p-4 shadow transition hover:shadow-md">
     
      <button
        onClick={(e) => {
          e.preventDefault();   
          e.stopPropagation();  
          onToggleFavorite(product.id);
        }}
        className="absolute right-3 top-3 z-10 text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

     
      <Link href={`/products/${product.id}`} className="block">
        <div>
          <div className="relative h-40 w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="mt-3 text-sm  line-clamp-2 text-gray-400 font-semibold">
            {product.title}
          </h3>

          <p className="mt-2 text-lg font-semibold text-gray-400 ">
            ₹ {product.price}
          </p>

          <p className="mt-1 text-xs border w-fit px-2 rounded-2xl text-gray-500 dark:text-gray-400 capitalize">
            {product.category}
          </p>
        </div>
      </Link>
    </div>
  );
}
