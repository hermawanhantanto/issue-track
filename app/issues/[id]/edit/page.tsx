import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueLoadingForm from "../../_components/IssueLoadingForm";
interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingForm />,
});

const IssueEditPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <>
      <IssueForm issue={issue} />
    </>
  );
};

export default IssueEditPage;
