"use client";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select, SelectGroup } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 60 seconds
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  //   const [users, setUsers] = React.useState<User[]>([]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const { data } = await axios.get<User[]>("/api/users");
  //       setUsers(data);
  //     };

  //     fetchUsers();
  //   }, []);

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assigne..." />
        <Select.Content>
          <SelectGroup>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => {
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
