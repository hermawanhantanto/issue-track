import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetail from "./IssueDetail";
import DeleteIssueBtn from "./DeleteIssueBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import AssigneSelect from "./AssigneSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUSer = cache((userId: number) =>
  prisma.issue.findUnique({
    where: { id: userId },
  })
);

const DetailIssue = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUSer(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneSelect issue={issue} />
          <EditIssueBtn issueId={issue.id} />
          {session && <DeleteIssueBtn issueId={issue.id} />}
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUSer(parseInt(params.id));

  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: issue?.description,
  };
}

export default DetailIssue;
