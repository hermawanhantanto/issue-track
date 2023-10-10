"use client";
import { Status } from "@prisma/client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const params = new URLSearchParams();
  const searchParams = useSearchParams();

  const router = useRouter();

  const onStatusChange = (value: string) => {
    if (value === "All") {
      if (searchParams.get("orderBy"))
        params.append("orderBy", searchParams.get("orderBy")!);
      const query = params.size ? "?" + params.toString() : "";
      router.push("/issues/list" + query);
    } else {
      params.append("status", value);
      if (searchParams.get("orderBy"))
        params.append("orderBy", searchParams.get("orderBy")!);
      const query = params.size ? "?" + params.toString() : "";
      router.push(`/issues/list` + query);
    }
  };

  return (
    <Select.Root
      onValueChange={(value) => {
        onStatusChange(value);
      }}
      defaultValue={searchParams.get("status") || ""}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
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
