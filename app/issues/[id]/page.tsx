import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetail from "./IssueDetail";
interface Props {
  params: { id: string };
}

const DetailIssue = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditIssueBtn issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default DetailIssue;
