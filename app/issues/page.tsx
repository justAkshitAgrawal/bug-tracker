import IssueFilter from "@/components/IssueFilter";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import Link from "@/components/Link";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Button, Table } from "@radix-ui/themes";
import NextLink from "next/link";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: string;
  };
}) => {
  let issues;

  if (searchParams.status && searchParams.orderBy) {
    issues = await prisma.issue.findMany({
      where: {
        status: searchParams.status,
      },
      orderBy: {
        [searchParams.orderBy]: "asc",
      },
    });
  } else if (searchParams.status) {
    issues = await prisma.issue.findMany({
      where: {
        status: searchParams.status,
      },
    });
  } else {
    issues = await prisma.issue.findMany();
  }

  const columns = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <IssueFilter />
        <Button className=" text-white">
          <NextLink href="/issues/new">New Issue</NextLink>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              return (
                <Table.ColumnHeaderCell
                  className={column.className}
                  key={column.label}
                >
                  <Link
                    // @ts-ignore
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt?.toLocaleDateString("en-US")}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
