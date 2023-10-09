import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueBar, LinkCustom, StatusBadge } from "@/app/components";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <div className="mb-5">
        <IssueBar />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export const dynamic = "force-dynamic"; // 30 seconds
// static 5 minutes
// bisa di cek di route segment config
export default Issues;
