"use client";

import { User } from "@prisma/client";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "sonner";

interface Props {
  issueId: number;
  assignedToUserId?: string | null;
}

const SelectAssignee = ({ issueId, assignedToUserId }: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton width={"10vw"} height={34} />;
  if (error) return null;

  return (
    <div className="flex w-full flex-col gap-5">
      <Select.Root
        defaultValue={assignedToUserId || ""}
        onValueChange={(userId) => {
          try {
            axios.patch(`/api/issues/${issueId}`, {
              assignedToUserId: userId === "none" ? null : userId,
            });
            if (userId === "none") {
              toast("Issue unassigned!");
            } else {
              toast.success("Issue assigned!");
            }
          } catch (error) {
            toast.error("Something went wrong!");
          }
        }}
      >
        <Select.Trigger className="w-full" placeholder="Assign to..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={"none"}>Unassigned</Select.Item>
            {users?.map((user: User) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Button
        onClick={async () => {
          try {
            await axios.patch(`/api/issues/${issueId}`, {
              status: "DONE",
            });
          } catch (error) {
            toast.error("Something went wrong!");
          }
        }}
        color="green"
      >
        <CheckCircledIcon />
        Mark as done
      </Button>
    </div>
  );
};

export default SelectAssignee;
