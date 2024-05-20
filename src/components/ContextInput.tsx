"use client";

import {
  youtubeUrlSchema,
  submitYtContext,
  type YoutubeUrlSchema,
} from "@/lib/submitYtContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "./ui/useToast";
import { useState } from "react";
import { Spinner } from "./icon/Spinner";

export default function ContextInput() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<YoutubeUrlSchema>({
    resolver: zodResolver(youtubeUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  return (
    <Form {...form}>
      <fieldset className="grid gap-6 rounded-lg border p-4 mt-2">
        <legend className="-ml-1 px-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Context input
        </legend>

        <form
          onSubmit={form.handleSubmit(async (vals) => {
            setIsLoading(true);
            await submitYtContext(vals, toast);
            setIsLoading(false);
          })}
          className="space-y-6 mt-auto"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-700 dark:text-zinc-200">
                  YouTube URL
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="https://youtube.com/watch?v=..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400 text-[0.8rem]" />
              </FormItem>
            )}
          />

          <div className="ml-auto w-fit">
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Adding context
                  <Spinner className="text-lg" />
                </div>
              ) : (
                "Add context"
              )}
            </Button>
          </div>
        </form>
      </fieldset>
    </Form>
  );
}
