import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = ({ closed, inProgress, open }: IssueSummaryProps) => {
  const statuses = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "DONE",
    },
  ];
  return (
    <Flex gap={"4"}>
      {statuses.map((status) => {
        return (
          <Card key={status.label}>
            <Flex direction={"column"} gap={"1"}>
              <Link
                className="text-sm font-medium"
                href={`/issues?status=${status.status}`}
              >
                {status.label}
              </Link>
              <Text size={"5"} className="font-bold">
                {status.value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssuesSummary;
