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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex mt={"2"} gap={"3"}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt?.toLocaleDateString("en-US")}</Text>
        </Flex>
        <Card className="prose" mt={"2"}>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      {session?.user && (
        <Box className="flex space-x-5">
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>

          <DeleteModal issue={{ id: issue.id }} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueIdPage;
