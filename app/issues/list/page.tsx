import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueBar, LinkCustom, StatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const Issues = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: { label: string; value: keyof Issue; classNames?: string }[] =
    [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", classNames: "hidden md:table-cell" },
      {
        label: "Created",
        value: "createdAt",
        classNames: "hidden md:table-cell",
      },
    ];

  const orderBy = columns
    .map((item) => item.value)
    .includes(searchParams.orderBy)
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
    <div>
      <div className="mb-5">
        <IssueBar />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((item) => (
              <Table.ColumnHeaderCell
                key={item.label}
                className={item.classNames ? item.classNames : ""}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: item.value },
                  }}
                >
                  {item.label}{" "}
                  {item.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <LinkCustom href={`/issues/${issue.id}`}>
                    {issue.title}
                  </LinkCustom>
                  <div className="block md:hidden">
                    <StatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <StatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueAccount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic"; // 30 seconds
// static 5 minutes
// bisa di cek di route segment config
export default Issues;
