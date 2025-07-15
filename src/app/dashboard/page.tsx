"use client";

import UpdateProfileForm from "@/features/profile/form/UpdateProfileForm";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import React from "react";

const DashboardHomePage = () => {
  const { data, isLoading } = api.profile.get.useQuery();
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">
        Hello <u className="text-primary">Anjar Dwi Hariadi</u> !
      </h1>
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <UpdateProfileForm defaultValues={data ?? {}} />
      )}
    </div>
  );
};

export default DashboardHomePage;
