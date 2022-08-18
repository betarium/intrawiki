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

    console.info("page load")
    try {
      const result = await fetch("/intrawiki-manage/api/pages/?title=" + location.pathname,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          //        body: JSON.stringify(data)
        }
      )

      if (result.status === 404) {
        navigator("/error/404?page=" + encodeURIComponent(location.pathname))
        // setError("not found")
        return
      }

      const res = await result.json() as PageRequest
      setPage(res)
    }
    catch (ex) {
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
            <a href={"/intrawiki-manage/edit?page=" + encodeURIComponent(location.pathname)}>edit</a>
          </div>
        </>
      }
    </>
  );
}

export default ContentsView;
