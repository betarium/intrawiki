import { AuthApi } from "api/apis/AuthApi";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useContext } from "react";
import PageOuterFrame from "views/PageOuterFrame";
import { AppContextDef } from "../contexts/AppContext";
import ContentsView from "../views/ContentsView";
import PageFrame from "../views/PageFrame";

function HomePage() {
  const appContext = useContext(AppContextDef)

  const onInit = useCallback(async () => {
    try {
      const api = new AuthApi(new ApiConfiguration())
      const res = await api.getAuthInfo()

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
          <a href="/intrawiki-manage/login">login</a>
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
