"use client";
import React from "react";
import { Select, SelectGroup } from "@radix-ui/themes";
const AssigneSelect = () => {
  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assigne..." />
        <Select.Content>
          <SelectGroup>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Mosh Hamedani</Select.Item>
          </SelectGroup>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneSelect;
