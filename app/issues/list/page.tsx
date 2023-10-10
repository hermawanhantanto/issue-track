import { IssueBar } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const Issues = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueAccount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction="column" gap="4">
      <IssueBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueAccount}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - List",
  description: "List of issues for issue",
};

export const dynamic = "force-dynamic"; // 30 seconds
// static 5 minutes
// bisa di cek di route segment config
export default Issues;
