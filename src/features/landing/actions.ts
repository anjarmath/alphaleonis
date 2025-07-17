"use server";

import { db } from "@/server/db";

export async function getProfile() {
  return db.profile.findFirst();
}

export async function getPortfolios() {
  return db.portfolio.findMany({
    where: {
      visible: true,
    },
  });
}

export async function getExperiences() {
  return db.experience.findMany({
    orderBy: {
      index: "asc",
    },
  });
}

export async function getCertificates() {
  return db.certificate.findMany();
}
