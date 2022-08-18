import { AuthApi } from "api/apis/AuthApi";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContextDef } from "../contexts/AppContext";
import PageFrame from "../views/PageFrame";

function LogoutPage() {
  const navigator = useNavigate()
  const appContext = useContext(AppContextDef)

  const onInit = useCallback(async () => {
    try {
      const api = new AuthApi(new ApiConfiguration())
      await api.logout()

      appContext.setAuthInfo(undefined)
      appContext.updatePage()
      navigator("/")
    }
    catch (ex) {
      console.error("page error", ex)
    }
  }, [navigator, appContext])

  return (
    <PageFrame title="Logout" onInit={onInit}>
    </PageFrame>
  );
}

export default LogoutPage;
