"use client";

import { buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const PortfolioPage = () => {
  const { data: portfolios, isLoading } = api.portfolio.getAll.useQuery();
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Portfolio</h1>
        <Link
          href="/dashboard/portfolio/new"
          className={buttonVariants()}
          prefetch
        >
          Tambah Portfolio Baru <Plus />
        </Link>
      </div>
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="space-y-3">
          {/* {portfolios?.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))} */}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
