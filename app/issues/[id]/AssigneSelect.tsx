"use client";
import React, { useEffect } from "react";
import { Select, SelectGroup } from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";
const AssigneSelect = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assigne..." />
        <Select.Content>
          <SelectGroup>
            <Select.Label>Suggestions</Select.Label>
            {users.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </SelectGroup>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneSelect;
