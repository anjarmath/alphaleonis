"use client";

import AddPortfolioForm from "@/features/portfolio/form/AddPortfolioForm";
import React from "react";

const PortfolioPage = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <AddPortfolioForm />
    </div>
  );
};

export default PortfolioPage;
