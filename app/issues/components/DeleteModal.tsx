"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  issue: {
    id: number;
  };
}

const DeleteModal = ({ issue }: Props) => {
  const router = useRouter();

  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="w-full cursor-pointer ">
            <TrashIcon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently delete the issue.
          </AlertDialog.Description>
          <Flex mt={"2"} gap={"3"}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={async () => {
                  try {
                    await axios.delete(`/api/issues/${issue.id}`);
                    router.push("/issues");
                    router.refresh();
                  } catch (error: any) {
                    console.log(error);
                    toast.error(error.response.data.message);
                  }
                }}
                color="red"
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteModal;
