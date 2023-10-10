"use client";
import { Status } from "@prisma/client";
import React from "react";
import { Select } from "@radix-ui/themes";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {status.map((item) => (
            <Select.Item key={item.label} value={item.value || "All"}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
