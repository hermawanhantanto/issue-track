import { Box, Card } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetail = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton className="my-4" />
      <Card className="prose" mt="2">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetail;
