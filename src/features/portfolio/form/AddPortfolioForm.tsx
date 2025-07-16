"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { portfolioSchema, type PortfolioType } from "../schema";
import type { Certificate } from "@prisma/client";
import { fileToBase64 } from "@/lib/form-util";
import TiptapInput from "@/components/tiptap-editor";

const AddPortfolioForm = () => {
  const util = api.useUtils();
  const [open, setOpen] = React.useState(false);

  const form = useForm<PortfolioType>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      brief: "",
    },
  });

  // const addPortfolio = api.portfolio.add.useMutation({
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  //   onSuccess: (data) => {
  //     util.certificate.get.setData(
  //       undefined,
  //       (prev: Certificate[] | undefined) => [...(prev ?? []), data],
  //     );
  //     setOpen(false);
  //     toast.success("Certificate berhasil ditambahkan");
  //   },
  // });

  const handleSubmit = (data: PortfolioType) => {
    // addCertificate.mutate(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          Tambahkan Portfolio <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-svh w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Tambahkan Portfolio</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="brief"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief</FormLabel>
                  <FormControl>
                    <TiptapInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={false}>
              {false ? "Loading..." : "Tambah Certificate"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPortfolioForm;
