import { makeStyles } from "@griffel/react";
import { AuthApi } from "api/apis/AuthApi";
import ApiConfiguration from "common/ApiConfiguration";
import { MouseEvent, useCallback, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ErrorView from "views/ErrorView";
import { AppContextDef } from "../contexts/AppContext";
import PageFrame from "../views/PageFrame";

function LoginPage() {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>("")
  const [loginProgress, setLoginProgress] = useState(false)
  const appContext = useContext(AppContextDef)

  const styles = useStyles()

  const navigator = useNavigate()

  const onLoginRequest = useCallback(async () => {
    const data = { account: account, password: password }
    const api = new AuthApi(new ApiConfiguration())
    try {
      const res = await api.login({ loginRequest: data })
      setLoginProgress(false)
      if (!res.success) {
        setError("Login failed. Incorrect username or password.")
        return
      }

      appContext.setAuthInfo(res)
      appContext.updatePage()

      navigator(res.redirectUrl ?? "/")
    }
    catch (ex) {
      setPassword("")
      setLoginProgress(false)
      setError("Login failed. Incorrect username or password.")
    }
  }, [navigator, account, password, appContext])

  const validation = useCallback(() => {
    if (account.length === 0) {
      setError("Account required.")
      return false
    }
    else if (password.length === 0) {
      setError("Password required.")
      return false
    }

    return true
  }, [account, password])

  const onLogin = useCallback((e: MouseEvent) => {
    e.preventDefault()

    setError("")

    if (!validation()) {
      return
    }

    setLoginProgress(true)
    onLoginRequest()
  }, [onLoginRequest])

  return (
    <PageFrame title="Login">
      <ErrorView message={error} />
      <form className={styles.LoginPage}>
        <div>
          <label>Account:</label>
          <input type="text" value={account} onChange={e => setAccount(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.ActionRow}>
          <input type="submit" value="Login" onClick={(e) => onLogin(e)} disabled={loginProgress} />
        </div>
      </form>
    </PageFrame>
  );
}

export default LoginPage;

const useStyles = makeStyles({
  LoginPage: {
    minWidth: "200px",
    maxWidth: "280px",
    "& label": {
      minWidth: "80px",
      display: "inline-block",
    }
  },
  ActionRow: {
    textAlign: "right",
    paddingTop: "10px",
  }
})
