import React from "react";
import dynamic from "next/dynamic";
import IssueLoadingForm from "../_components/IssueLoadingForm";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingForm />,
});

const IssueNewPage = () => {
  return (
    <>
      <IssueForm />
    </>
  );
};

export default IssueNewPage;
