"use client";

import { useQueryClient } from "@tanstack/react-query";
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
import { Edit } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { experienceSchema, type ExperienceSchematype } from "../schema";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "@prisma/client";

const EditExperienceForm = ({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues: Partial<Experience>;
}) => {
  const util = api.useUtils();
  const [open, setOpen] = React.useState(false);

  const form = useForm<ExperienceSchematype>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      index: defaultValues.index ?? 0,
      company: defaultValues.company ?? "",
      title: defaultValues.title ?? "",
      description: defaultValues.description ?? "",
      period: defaultValues.period ?? "",
    },
  });

  const editExperience = api.experience.edit.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      util.experience.get.setData(
        undefined,
        (prev: Experience[] | undefined) => [
          ...(prev ?? []).map((item) => (item.id === data.id ? data : item)),
        ],
      );
      setOpen(false);
      toast.success("Experience berhasil diperbarui");
    },
  });

  const handleSubmit = (data: ExperienceSchematype) => {
    editExperience.mutate({ data, id });
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
        <Button onClick={() => setOpen(true)} size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-svh w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Perbarui Experience</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Index</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={editExperience.isPending}
            >
              {editExperience.isPending ? "Loading..." : "Perbarui Experience"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExperienceForm;
