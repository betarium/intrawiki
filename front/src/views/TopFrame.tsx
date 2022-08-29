import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { AppContextDef, AppContextImpl } from "../contexts/AppContext";
import HeaderView from "./HeaderView";
import PublicFrame from "./PublicFrame";
import RestrictFrame from "views/RestrictFrame";
import ApiConfiguration from "common/ApiConfiguration";
import { AuthApi, AuthInfoResponse, ResponseError } from "api";

class AppContextHolder {
  static context: AppContextImpl | undefined
}

function TopFrame(props: { children: ReactElement[] }) {
  const init = useRef(false);
  const [loaded, setLoaded] = useState(false)
  const [authInfo, setAuthInfo] = useState<AuthInfoResponse>()
  const [appContext,] = useState(AppContextHolder.context ?? new AppContextImpl())
  const [update, setUpdate] = useState(0)

  if (AppContextHolder.context === undefined) {
    AppContextHolder.context = appContext
  }

  const onUpdatePage = useCallback(() => {
    setUpdate(update + 1)
  }, [setUpdate, update])

  appContext.setUpdate(() => onUpdatePage())

  if (!(props.children[0].type === PublicFrame)) {
    throw Error("invalid children")
  }

  if (!(props.children[1].type === RestrictFrame)) {
    throw Error("invalid children")
  }

  const onInit = useCallback(async () => {
    if (init.current) {
      return
    }
    init.current = true

    try {
      const api = new AuthApi(new ApiConfiguration())
      const res = await api.getAuthInfo()
      if (!res.loggedIn) {
        setLoaded(true)
        return
      }

      setAuthInfo(res)
      appContext.setAuthInfo(res)
      setLoaded(true)
    }
    catch (ex) {
      if (ex instanceof ResponseError && ex.response.status === 401) {
        appContext.setAuthInfo(undefined)
        setLoaded(true)
        return
      }

      console.error("page error.", ex)
    }
  }, [setLoaded, appContext])

  useEffect(() => {
    onInit()
  }, [onInit])

  return (
    <AppContextDef.Provider value={appContext}>
      <div>
        <HeaderView />
        {!loaded &&
          <div>Loading...</div>
        }
        {loaded && authInfo === undefined && props.children[0].type === PublicFrame &&
          props.children[0]
        }
        {loaded && authInfo !== undefined && props.children[1].type === RestrictFrame &&
          props.children[1]
        }
      </div>
    </AppContextDef.Provider>
  );
}

export default TopFrame;
