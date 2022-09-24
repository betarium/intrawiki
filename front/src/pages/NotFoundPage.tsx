import { useLocation } from "react-router";
import PageFrame from "views/PageFrame";
import useLocationQuery from "../common/useLocationQuery";

function NotFoundPage() {
  const location = useLocation()
  const query = useLocationQuery()

  const page = query.get("page") ?? location.pathname

  const managePath = process.env.REACT_APP_MANAGE_PATH ?? '/intrawiki-manage'

  return (
    <PageFrame title="Error - Not Found">
      <a href={managePath + "/edit?page=" + encodeURIComponent(page) + "&new=1"}>edit</a>
    </PageFrame>
  );
}

export default NotFoundPage;
