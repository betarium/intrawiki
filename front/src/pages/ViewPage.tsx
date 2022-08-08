import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

interface PageRequest {
  title: string
  contents?: string
}

function ViewPage() {
  const location = useLocation()
  const [page, setPage] = useState<PageRequest>()
  const init = useRef(false);
  const [error, setError] = useState<string | undefined>(undefined)

  const onInit = useCallback(async () => {
    if (init.current) {
      return
    }
    init.current = true

    if (page !== undefined) {
      return
    }
    console.info("page load")
    try {
      const result = await fetch("/api/pages/?title=" + location.pathname,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          //        body: JSON.stringify(data)
        }
      )

      if (result.status === 404) {
        setError("not found")
        return
      }

      const res = await result.json() as PageRequest
      setPage(res)
    }
    catch (ex) {
      console.error("page error1")
      console.error("page error", ex)
      console.dir(ex)
      setError("not found")
    }
  }, [])

  useEffect(() => {
    onInit()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>View</h1>
        {(error !== undefined) &&
          <div>Error</div>
        }
        {(error === undefined && page === undefined) &&
          <div>Loading...</div>
        }
        {(error === undefined && page !== undefined) &&
          <div>
            {page.contents}
          </div>
        }
      </header>
    </div>
  );
}

export default ViewPage;
