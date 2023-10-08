import StatusBadge from "@/app/components/StatusBadge";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
