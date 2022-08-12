import { useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContextDef } from "../contexts/AppContext";
import PageFrame from "../views/PageFrame";

function LogoutPage() {
  const navigator = useNavigate()
  const appContext = useContext(AppContextDef)

  const onInit = useCallback(async () => {
    try {
      await fetch("/api/auth/logout",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      )

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
