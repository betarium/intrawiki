import { PagesApi, ResponseError } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import MarkDownView from "./MarkDownView";

interface PageRequest {
  title: string
  contents?: string
}

function ContentsView() {
  const location = useLocation()
  const [page, setPage] = useState<PageRequest>()
  const init = useRef(false);
  const [error, setError] = useState<string | undefined>(undefined)
  const navigator = useNavigate()

  const onInit = useCallback(async () => {
    if (init.current) {
      return
    }
    init.current = true

    try {
      const api = new PagesApi(new ApiConfiguration())
      const res = await api.getPageForTitle({ title: location.pathname })
      setPage(res)
    }
    catch (ex) {
      if (ex instanceof ResponseError && ex.response.status === 404) {
        navigator("/error/404?page=" + encodeURIComponent(location.pathname))
        return
      }

      console.error("page error", ex)
      setError("not found")
    }
  }, [navigator, location])

  useEffect(() => {
    onInit()
  }, [onInit])

  return (
    <>
      {(error !== undefined) &&
        <div>Error</div>
      }
      {(error === undefined && page === undefined) &&
        <div>Loading...</div>
      }
      {(error === undefined && page !== undefined) &&
        <>
          <MarkDownView contents={page.contents ?? ""} />
          <div>
            <hr />
            <a href={"/intrawiki-manage/edit?page=" + encodeURIComponent(location.pathname)}>edit</a>
          </div>
        </>
      }
    </>
  );
}

export default ContentsView;
