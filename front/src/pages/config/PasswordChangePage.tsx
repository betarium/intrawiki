import { makeStyles } from "@griffel/react";
import { AuthApi } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { AppContextDef } from "contexts/AppContext";
import { useCallback, useContext, useState } from "react";
import PageFrame from "views/PageFrame";

function PasswordChangePage() {
  const appContext = useContext(AppContextDef)

  const styles = useStyles()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

  const onCallApi = useCallback(async () => {
    try {
      const api = new AuthApi(new ApiConfiguration())
      const res = await api.changePassword({ changePasswordRequest: { oldPassword: oldPassword, newPassword: newPassword } })
      if (res.success) {
        setOldPassword("")
        setNewPassword("")
        setNewPasswordConfirm("")
        alert("Password change complete.")
      }
    }
    catch (ex) {
      console.error("api error", ex)
      alert("password change failed.")
    }
  }, [oldPassword, newPassword])

  const onSave = useCallback(() => {
    if (oldPassword === undefined || oldPassword.length === 0) {
      alert("Old password required.")
      return
    }
    else if (newPassword === undefined || newPassword.length === 0) {
      alert("New password required.")
      return
    }
    else if (newPassword.length < 8) {
      alert("New password is short.")
      return
    }
    else if (newPasswordConfirm === undefined || newPasswordConfirm.length === 0) {
      alert("New password(Confirm) required.")
      return
    }
    else if (newPassword !== newPasswordConfirm) {
      alert("New password defferent.")
      return
    }

    onCallApi()
  }, [oldPassword, newPassword, newPasswordConfirm, onCallApi])

  return (
    <PageFrame title={"User Detail"}>
      <div>
        <a href="/intrawiki-manage/config">config...</a>
      </div>
      <section>
        <div>
          <label className={styles.label}>Account</label>
          <span className={styles.value}>{appContext.authInfo?.account}</span>
        </div>
        <div>
          <label className={styles.label}>Old password</label>
          <span className={styles.value}><input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} /></span>
        </div>
        <div>
          <label className={styles.label}>New password</label>
          <span className={styles.value}><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></span>
        </div>
        <div>
          <label className={styles.label}>New password(Confirm)</label>
          <span className={styles.value}><input type="password" value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} /></span>
        </div>
        <div>
          <input type="button" value="Save" onClick={onSave} />
        </div>
      </section>
    </PageFrame >
  )
}

export default PasswordChangePage;

const useStyles = makeStyles({
  contents: {
    width: "100%",
    minHeight: "200px",
  },
  label: {
    display: "inline-block",
    minWidth: "200px",
    color: "white",
    backgroundColor: "darkgray",
    marginWidth: "2px",
    marginBottom: "10px",
  },
  value: {
    display: "inline-block",
    marginLeft: "10px",
  },
})
