import { Status } from "@prisma/client";
import React from "react";
import { Flex, Card, Text, Heading } from "@radix-ui/themes";
import Link from "next/link";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="2">
            <Link href={`/issues/list/?status=${container.status}`}>
              {container.label}
            </Link>
            <Heading className="font-bold">{container.value}</Heading>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
