"use client";
import EditPortfolioForm from "@/features/portfolio/form/EditPortfolioForm";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import React, { use } from "react";

const EditPortfolioPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: portfolio, isLoading } = api.portfolio.get.useQuery({
    id: Number(id),
  });
  return isLoading ? (
    <Loader className="animate-spin" />
  ) : (
    <div className="space-y-3">
      <EditPortfolioForm id={Number(id)} defaultValues={portfolio ?? {}} />
    </div>
  );
};

export default EditPortfolioPage;
