import { makeStyles } from "@griffel/react";
import { User, UsersApi, UserType } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import PageFrame from "views/PageFrame";

interface UserDetailState extends User {
  newFlag?: boolean
}

function UserDetailPage() {
  const styles = useStyles()

  const params = useParams()

  const id = params["id"]

  const [oldUserId,] = useState<number>((id !== undefined) ? parseInt(id) : -1)

  const initUser = { id: oldUserId, account: "", userName: "", userType: UserType.Normal, newFlag: (oldUserId === -1) } as UserDetailState
  const [user, setUser] = useState<UserDetailState>(initUser)

  const onInit = useCallback(async () => {
    try {
      if (user.newFlag) {
        return
      }

      const api = new UsersApi(new ApiConfiguration())
      const res = await api.getUserDetail({ id: user.id })
      setUser(res)
    }
    catch (ex) {
      console.error("api error", ex)
    }
  }, [user, setUser])

  const setAccount = useCallback((value: string) => {
    setUser({ ...user, account: value })
  }, [user, setUser])

  const setEmail = useCallback((value: string) => {
    setUser({ ...user, email: value })
  }, [user, setUser])

  const setName = useCallback((value: string) => {
    setUser({ ...user, userName: value })
  }, [user, setUser])

  const setPassword = useCallback((value: string) => {
    setUser({ ...user, password: value })
  }, [user, setUser])

  const setUserType = useCallback((value: string) => {
    setUser({ ...user, userType: value as UserType })
  }, [user, setUser])

  const onSave = useCallback(async () => {
    try {
      if (user.account.length === 0) {
        alert("Account required.")
        return
      }
      else if (user.userName.length === 0) {
        alert("Name required.")
        return
      }
      else if (user.newFlag && (user.password === undefined || user.password?.length === 0)) {
        alert("Password required.")
        return
      }

      const api = new UsersApi(new ApiConfiguration())
      if (user.newFlag) {
        const res = await api.createUser({ user: user })
        setUser(res)
        alert("User regist complete.")
      } else {
        const res = await api.updateUser({ id: user.id, user: user })
        setUser(res)
        alert("User update complete.")
      }
    }
    catch (ex) {
      console.error("api error", ex)
      if (user.newFlag) {
        alert("User regist failed.")
      } else {
        alert("User update failed.")
      }
    }
  }, [user, setUser])

  return (
    <PageFrame title={"User Detail"} onInit={!user.newFlag ? onInit : undefined}>
      <div>
        <a href="/intrawiki-manage/config/users">list...</a>
      </div>
      <>
        {user !== undefined &&
          <section>
            <div>
              <label className={styles.label}>Account</label>
              {user.newFlag &&
                <span className={styles.value} ><input type="text" value={user.account} onChange={e => setAccount(e.target.value)} autoComplete="off" /></span>
              }
              {!user.newFlag &&
                <span className={styles.value} >{user.account}</span>
              }
            </div>
            <div>
              <label className={styles.label}>User Type</label>
              <span className={styles.value}>
                <select value={user.userType} onChange={(e) => setUserType(e.target.value)}>
                  <option value={UserType.Normal} label={UserType.Normal} />
                  <option value={UserType.Guest} label={UserType.Guest} />
                  <option value={UserType.Admin} label={UserType.Admin} />
                </select>
              </span>
            </div>
            <div>
              <label className={styles.label}>Name</label>
              <span className={styles.value}><input type="text" value={user.userName} onChange={e => setName(e.target.value)} autoComplete="off" /></span>
            </div>
            <div>
              <label className={styles.label}>E-mail</label>
              <span className={styles.value}><input type="email" name="email" value={user.email} onChange={e => setEmail(e.target.value)} autoComplete="off" /></span>
            </div>
            <div>
              <label className={styles.label}>Password</label>
              <span className={styles.value}><input type="password" name="newPassword" value={user.password ?? ""} onChange={e => setPassword(e.target.value)} autoComplete="new-password" /></span>
            </div>
            <div>
              <input type="button" value="Save" onClick={onSave} />
            </div>
          </section>
        }
      </>
    </PageFrame >
  )
}

export default UserDetailPage;

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
  },
  value: {
    display: "inline-block",
    marginLeft: "10px",
  },
})
