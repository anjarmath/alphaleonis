"use client";

import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Share2 } from "lucide-react";

const ShareButton = () => {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      }}
      variant="outline"
    >
      Share
      <Share2 />
    </Button>
  );
};

export default ShareButton;
