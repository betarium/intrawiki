import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>()
  const [loginProgress, setLoginProgress] = useState(false)

  const navigator = useNavigate()

  const onLoginRequest = useCallback(async () => {
    const data = { account: account, password: password }
    const result = await fetch("/api/auth/login",
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

    navigator(res.redirectUrl)
  }, [navigator, account, password])

  const onLogin = useCallback(async () => {
    setError("")
    setLoginProgress(true)
    onLoginRequest()
  }, [onLoginRequest])

  return (
    <div className="App">
      <h1>Login</h1>
      <div>
        {error}
      </div>
      <div>
        Account: <input type="text" value={account} onChange={e => setAccount(e.target.value)} />
      </div>
      <div>
        Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <input type="button" value="Login" onClick={() => onLogin()} disabled={loginProgress} />
      </div>
    </div>
  );
}

export default LoginPage;
