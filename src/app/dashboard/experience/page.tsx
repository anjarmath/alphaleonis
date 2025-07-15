"use client";

import ExperienceCard from "@/features/experience/component/ExperienceCard";
import AddExperienceForm from "@/features/experience/form/AddExperienceForm";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import React from "react";

const ExperiencePage = () => {
  const { data: experiences, isLoading } = api.experience.get.useQuery();
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Experience</h1>
        <AddExperienceForm />
      </div>
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="space-y-3">
          {experiences?.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperiencePage;
