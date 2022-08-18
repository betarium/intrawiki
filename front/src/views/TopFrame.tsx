import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { AppContextDef, AppContextImpl } from "../contexts/AppContext";
import { AuthInfoResponse } from "../models/AuthInfoResponse";
import HeaderView from "./HeaderView";
import PublicFrame from "./PublicFrame";
import RestrictFrame from "views/RestrictFrame";

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
    console.info("onUpdatePage:" + update)
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
      const result = await fetch("/intrawiki-manage/api/auth/info",
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          //        body: JSON.stringify(data)
        }
      )

      if (result.status !== 200) {
        setLoaded(true)
        return
      }

      const res = await result.json() as AuthInfoResponse
      if (!res.loggedIn) {
        setLoaded(true)
        return
      }

      setAuthInfo(res)
      appContext.setAuthInfo(res)
      setLoaded(true)
    }
    catch (ex) {
      console.error("page error", ex)
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
