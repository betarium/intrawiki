import { AuthApi } from "api/apis/AuthApi";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContextDef } from "../contexts/AppContext";
import PageFrame from "../views/PageFrame";

function LoginPage() {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>()
  const [loginProgress, setLoginProgress] = useState(false)
  const appContext = useContext(AppContextDef)

  const navigator = useNavigate()

  const onLoginRequest = useCallback(async () => {
    const data = { account: account, password: password }
    // const api = new AuthApi(new ApiConfiguration())
    // await api.login()
    const result = await fetch("/intrawiki-manage/api/auth/login",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )

    const res = await result.json()
    setLoginProgress(false)
    if (!res.success) {
      setError("Login failed.")
      return
    }

    appContext.setAuthInfo(res)
    appContext.updatePage()

    navigator(res.redirectUrl)
  }, [navigator, account, password, appContext])

  const onLogin = useCallback(async () => {
    setError("")
    setLoginProgress(true)
    onLoginRequest()
  }, [onLoginRequest])

  return (
    <PageFrame title="Login">
      <div>
        {error}
      </div>
      <form>
        <div>
          Account: <input type="text" value={account} onChange={e => setAccount(e.target.value)} />
        </div>
        <div>
          Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="submit" value="Login" onClick={() => onLogin()} disabled={loginProgress} />
        </div>
      </form>
    </PageFrame>
  );
}

export default LoginPage;
