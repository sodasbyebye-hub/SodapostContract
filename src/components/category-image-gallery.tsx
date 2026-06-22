"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Category } from "@/lib/site-data";

const galleryItems = [
  { image: "/images/category-apparel.png", categoryIndex: 0, className: "sm:col-span-2 sm:row-span-2" },
  { image: "/images/category-beauty.png", categoryIndex: 2, className: "" },
  { image: "/images/category-home.png", categoryIndex: 4, className: "" },
  { image: "/images/category-outdoor-pet.png", categoryIndex: 5, className: "sm:col-span-2" },
] as const;

export function CategoryImageGallery({ categories }: { categories: Category[] }) {
  return (
    <div className="grid auto-rows-[11rem] gap-3 sm:grid-cols-4">
      {galleryItems.map((item, index) => {
        const category = categories[item.categoryIndex];
        return (
          <motion.figure
            key={item.image}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.55 }}
            className={`group relative overflow-hidden rounded-xl bg-slate-200 ${item.className}`}
          >
            <Image
              src={item.image}
              alt={category.title}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white sm:p-5">
              {category.title}
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}
