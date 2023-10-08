import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
interface Props {
  params: { id: string };
}

const DetailIssue = async ({ params }: Props) => {
  await delay(2000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <Flex my="4" gap="4">
        <StatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt="2">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default DetailIssue;
