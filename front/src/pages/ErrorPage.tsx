import PageFrame from "views/PageFrame";
import useLocationQuery from "../common/useLocationQuery";

function ErrorPage() {
  const query = useLocationQuery()

  const message = query.get("message")

  return (
    <PageFrame title="Error">
      <div>{message}</div>
    </PageFrame>
  );
}

export default ErrorPage;
