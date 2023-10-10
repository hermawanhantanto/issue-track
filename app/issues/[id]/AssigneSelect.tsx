"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select, SelectGroup } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

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

  const onValue = (value: string) => {
    if (value === "unassigned") {
      axios
        .patch("/api/issues/" + issue.id, { assignedToUserId: null })
        .catch((error) => toast.error(error.message));
    } else {
      axios
        .patch("/api/issues/" + issue.id, { assignedToUserId: value })
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <>
      <Select.Root
        onValueChange={(value) => {
          onValue(value);
        }}
        defaultValue={issue.assignedToUserId || "unassigned"}
      >
        <Select.Trigger placeholder="Assigne..." />
        <Select.Content>
          <SelectGroup>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 60 seconds
    retry: 3,
  });

export default AssigneSelect;
