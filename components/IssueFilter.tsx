"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..."></Select.Trigger>
      <Select.Content>
        <Select.Item value="OPEN">Open</Select.Item>
        <Select.Item value="DONE">Closed</Select.Item>
        <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
        {/* @ts-ignore */}
        <Select.Item value={null}>All</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
