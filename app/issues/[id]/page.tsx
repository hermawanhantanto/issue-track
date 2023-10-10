import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetail from "./IssueDetail";
import DeleteIssueBtn from "./DeleteIssueBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

interface Props {
  params: { id: string };
}

const DetailIssue = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueBtn issueId={issue.id} />
          {session && <DeleteIssueBtn issueId={issue.id} />}
        </Flex>
      </Box>
    </Grid>
  );
};

export default DetailIssue;
