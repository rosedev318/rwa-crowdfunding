"use client";

import { Property } from "@/store/types";
import { Card } from "flowbite-react";
import Link from "next/link";

export default function PropertyCard({property}: {property: Property}) {
  return (
    <Card className="max-w-sm w-full h-full">
      <div className="flex h-full flex-col justify-between gap-2">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {property.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{property.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${property.total_fund.toLocaleString()}
          </span>
          <Link href={`/properties/${property.id}`}>
            <button
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
              View Detail
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
