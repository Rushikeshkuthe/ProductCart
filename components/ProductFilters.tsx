"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/app/types/product";
import ProductCard from "./ProductCard";
import { useFavorites } from "@/app/hooks/useFavorites";

interface Props {
  products: Product[];
}

export default function ProductFilters({ products }: Props) {
  const ITEMS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortPrice, setSortPrice] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const { favorites, toggleFavorite } = useFavorites();

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      return (
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || p.category === category) &&
        (!showFavorites || favorites.includes(p.id)) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1]
      );
    });

    if (sortPrice === "asc") list.sort((a, b) => a.price - b.price);
    if (sortPrice === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [
    products,
    search,
    category,
    showFavorites,
    favorites,
    priceRange,
    sortPrice,
  ]);

  useEffect(
    () => setCurrentPage(1),
    [search, category, showFavorites, priceRange, sortPrice]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <>
      <aside className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow animate-fade-in">
        <h2 className="mb-4 text-lg font-semibold text-gray-300">Filters</h2>

        <div className="flex flex-col gap-4 text-sm">
          <div className="relative w-full sm:w-64">
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
      md:w-3/4 w-full  rounded-full border border-gray-300 dark:border-gray-300
      bg-white dark:bg-gray-800 text-white
      px-10 py-2 text-sm text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
      shadow-sm
      focus:border-gray-500 focus:ring-2 focus:ring-gray-500/40
      focus:outline-none
      transition-all duration-300
    "
            />

            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </div>

          <div className="relative w-full sm:w-60">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
      appearance-none rounded-full
      border border-gray-300 
      bg-white dark:bg-gray-800
      px-4 py-2 pr-10 text-sm
      text-gray-900 dark:text-gray-100
      shadow-sm
      focus:border-gray-500 focus:ring-2 focus:ring-gray-500/40
      focus:outline-none
      transition-all duration-300 ease-in-out
      hover:border-gray-400 dark:hover:border-gray-500
      cursor-pointer
    "
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Dropdown Arrow */}
            <svg
              className="pointer-events-none absolute right-22 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Favorites
            </span>

            <div className="relative">
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={() => setShowFavorites(!showFavorites)}
                className="sr-only"
              />

              {/* Track */}
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-300
        ${showFavorites ? "bg-gray-400" : "bg-gray-600 "}`}
              />

              <div
                className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow
        transition-transform duration-300
        ${showFavorites ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </div>
          </label>

      
          <div className="flex items-center gap-3">
 
  <div className="relative w-full">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
      ₹
    </span>
    <input
      type="number"
      placeholder="Min"
      value={priceRange[0]}
      onChange={(e) =>
        setPriceRange([Number(e.target.value), priceRange[1]])
      }
      className="w-full rounded-lg border border-gray-300 text-gray-200
      bg-white dark:bg-gray-800 pl-7 pr-3 py-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-gray-500
      transition-all duration-300"
    />
  </div>

  <span className="text-gray-400 text-sm">—</span>

  <div className="relative w-full">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
      ₹
    </span>
    <input
      type="number"
      placeholder="Max"
      value={priceRange[1]}
      onChange={(e) =>
        setPriceRange([priceRange[0], Number(e.target.value)])
      }
      className="w-full rounded-lg border border-gray-300 text-gray-200
      bg-white dark:bg-gray-800 pl-7 pr-3 py-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-gray-500
      transition-all duration-300"
    />
  </div>
</div>

<div className="relative w-full sm:w-48">
  <select
    value={sortPrice}
    onChange={(e) => setSortPrice(e.target.value)}
    className="w-full appearance-none rounded-lg border border-gray-300
     dark:bg-gray-800 px-4 py-2 text-sm
    text-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-gray-500
    transition-all duration-300 cursor-pointer"
  >
    <option value="">Sort by price</option>
    <option value="asc">Low → High</option>
    <option value="desc">High → Low</option>
  </select>

 
  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
    ▼
  </span>
</div>

        </div>
      </aside>

   
      <section className="animate-slide-up">
        {paginated.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginated.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-md border px-4 py-2 disabled:opacity-50 bg-gray-100  font-semibold cursor-pointer"
            >
              Prev
            </button>

            <span className="px-4 py-2 text-sm text-gray-300">
              Page {currentPage} of{" "}
              {Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
            </span>

            <button
              disabled={currentPage * ITEMS_PER_PAGE >= filteredProducts.length}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-md border px-4 py-2 bg-gray-100  font-semibold disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
