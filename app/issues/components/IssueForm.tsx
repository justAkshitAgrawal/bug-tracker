"use client";

import { Button, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className=" max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          setIsSubmitting(true);
          await axios.patch(`/api/issues/${issue?.id}`, data);
          router.push("/issues ");
          router.refresh();
        } catch (error: any) {
          console.log(error);
          toast.error("Something went wrong");
        } finally {
          setIsSubmitting(false);
        }
      })}
    >
      <TextField.Root>
        <TextField.Input
          defaultValue={issue?.title}
          {...register("title")}
          placeholder="Title"
        />
      </TextField.Root>
      {errors.title && (
        <Text color="red" as="p" size={"1"}>
          {errors.title.message}
        </Text>
      )}
      <Controller
        name="description"
        defaultValue={issue?.description}
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      />
      {errors.description && (
        <Text color="red" size={"1"} as="p">
          {errors.description.message}
        </Text>
      )}
      <Button className=" cursor-pointer">
        {isSubmitting ? <Spinner /> : "Update Issue"}
      </Button>
    </form>
  );
};

export default IssueForm;
