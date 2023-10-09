import { Button, Link } from "@radix-ui/themes";
import React from "react";

const DeleteIssueBtn = ({ issueId }: { issueId: number }) => {
  return <Button color="red"> Delete Issue</Button>;
};

export default DeleteIssueBtn;
