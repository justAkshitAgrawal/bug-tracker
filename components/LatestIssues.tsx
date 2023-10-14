import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./IssueStatusBadge";
import Image from "next/image";

const LatestIssues = async () => {
  const recentIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size={"4"} mb={"5"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {recentIssues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify={"between"} align={"center"}>
                    <Flex direction={"column"} align={"start"} gap={"2"}>
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUserId && (
                      <div>
                        <Image
                          src={issue.assignedToUser?.image!}
                          alt="avatar"
                          height={40}
                          width={40}
                          className="rounded-full"
                        />
                      </div>
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
