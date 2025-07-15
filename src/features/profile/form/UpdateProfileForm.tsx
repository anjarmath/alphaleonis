"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { profileSchema, type ProfileSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Profile } from "@prisma/client";
import { fileToBase64 } from "@/lib/form-util";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const UpdateProfileForm = ({
  defaultValues,
}: {
  defaultValues: Partial<Profile>;
}) => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      greeting: defaultValues.greeting || "",
      descTitle: defaultValues.descTitle || "",
      descContent: defaultValues.descContent || "",
      email: defaultValues.email || "",
      image: undefined,
      resume: undefined,
      mood: defaultValues.mood || "",
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      console.log(base64);
      form.setValue("image", base64);
    }
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      console.log(base64);
      form.setValue("resume", base64);
    }
  };

  const updateProfile = api.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Profile updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: ProfileSchemaType) => {
    updateProfile.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="greeting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Greeting</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desc Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desc Content</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={updateProfile.isPending}>
          Update <Check />
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
