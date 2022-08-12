import { useCallback, useContext } from "react";
import PageOuterFrame from "views/PageOuterFrame";
import { AppContextDef } from "../contexts/AppContext";
import { AuthInfoResponse } from "../models/AuthInfoResponse";
import ContentsView from "../views/ContentsView";
import PageFrame from "../views/PageFrame";

function HomePage() {
  const appContext = useContext(AppContextDef)

  const onInit = useCallback(async () => {
    try {
      const result = await fetch("/api/auth/info",
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          //        body: JSON.stringify(data)
        }
      )

      if (result.status !== 200) {
        return
      }

      const res = await result.json() as AuthInfoResponse
      if (!res.loggedIn) {
        return
      }

      appContext.setAuthInfo(res)
    }
    catch (ex) {
      console.error("page error", ex)
    }
  }, [appContext])

  if (appContext.authInfo === undefined) {
    return (
      <PageFrame title="Home" onInit={onInit}>
        <div>
          <a href="/login">login</a>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageOuterFrame>
      <ContentsView />
    </PageOuterFrame>
  )
}

export default HomePage;
