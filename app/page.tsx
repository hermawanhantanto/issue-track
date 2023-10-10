import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";

export default function Home() {
  return (
    <>
      <IssueSummary open={10} inProgress={10} closed={10} />
    </>
  );
}
