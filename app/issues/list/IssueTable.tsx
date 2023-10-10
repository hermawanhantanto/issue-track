import { LinkCustom, StatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  );
};

const columns: { label: string; value: keyof Issue; classNames?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", classNames: "hidden md:table-cell" },
  {
    label: "Created",
    value: "createdAt",
    classNames: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((item) => item.value);
export default IssueTable;
