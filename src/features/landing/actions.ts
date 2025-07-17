"use server";

import { db } from "@/server/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getProfile() {
  noStore();
  return db.profile.findFirst();
}

export async function getPortfolios() {
  noStore();
  return db.portfolio.findMany({
    where: {
      visible: true,
    },
  });
}

export async function getExperiences() {
  noStore();
  return db.experience.findMany({
    orderBy: {
      index: "asc",
    },
  });
}

export async function getCertificates() {
  noStore();
  return db.certificate.findMany();
}
