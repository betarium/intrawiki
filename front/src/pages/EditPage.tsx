import { makeStyles } from "@griffel/react";
import { PagesApi } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useLocationQuery from "../common/useLocationQuery";
import PageFrame from "../views/PageFrame";

interface PageRequest {
  title: string
  contents?: string
}

function EditPage() {
  const navigator = useNavigate()
  const query = useLocationQuery()
  const page = query.get("page")
  const newFlag = query.get("new")
  const styles = useStyles()
  const [pageInfo, setPageInfo] = useState<PageRequest>()

  if (page === undefined || page === null) {
    throw Error("invalid parameter")
  }

  const pageName = (page === "/") ? "/" : page.startsWith("/") ? page.substring(1) : page

  const [contents, setContents] = useState("#" + pageName + "\n")

  if (pageName.length <= 0) {
    throw Error("invalid parameter")
  }

  const onInit = useCallback(async () => {
    try {
      const api = new PagesApi(new ApiConfiguration())
      const res = await api.getPageForTitle({ title: pageName })
      setPageInfo(res)
      setContents(res.contents ?? "")
    }
    catch (ex) {
      console.error("page error", ex)
      // setError("not found")
    }
  }, [pageName])

  const onSave = useCallback(async () => {
    const data = { title: pageName, contents: contents } as PageRequest
    const result = await fetch("/intrawiki-manage/api/pages/save",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )
    if (result.status === 200) {
      if (pageName === "/") {
        navigator("/")
      } else {
        navigator("/" + pageName)
      }
    }
  }, [contents, navigator, pageName])

  return (
    <PageFrame title={"Edit - " + pageName} onInit={!newFlag ? onInit : undefined}>
      <>
        {!newFlag && pageInfo === undefined &&
          <div>Loading...</div>
        }
        {(newFlag || pageInfo !== undefined) &&
          <>
            <div>
              <textarea className={styles.contents} onChange={(e) => setContents(e.target.value)} value={contents} />
            </div>
            <div>
              <button onClick={() => onSave()} >Save</button>
            </div>
            <div>
              <a href="/">top</a>
            </div>
          </>
        }
      </>
    </PageFrame>
  );
}

export default EditPage;

const useStyles = makeStyles({
  contents: {
    width: "100%",
    minHeight: "200px",
  },
})
