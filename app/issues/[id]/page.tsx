import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteModal from "../components/DeleteModal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SelectAssignee from "@/components/SelectAssignee";

interface Props {
  params: { id: string };
}

const IssueIdPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: "1", md: "3" }} gap={"5"} mx={"5"}>
      <Box className=" col-span-2 w-full">
        <Heading>{issue.title}</Heading>
        <Flex mt={"2"} gap={"3"}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt?.toLocaleDateString("en-US")}</Text>
        </Flex>
        <ReactMarkdown className=" mt-4 min-h-[20vh] rounded-lg border border-zinc-200 p-5">
          {issue.description}
        </ReactMarkdown>
      </Box>
      {session?.user && (
        <div className="flex max-w-[10vw] flex-col gap-5 ">
          <SelectAssignee
            issueId={issue.id}
            assignedToUserId={issue.assignedToUserId}
          />
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>

          <DeleteModal issue={{ id: issue.id }} />
        </div>
      )}
    </Grid>
  );
};

export default IssueIdPage;
