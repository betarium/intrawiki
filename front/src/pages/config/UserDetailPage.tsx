import { makeStyles, useScrollTrigger } from "@material-ui/core";
import { User, UserListResponse, UsersApi } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageFrame from "views/PageFrame";

function UserDetailPage() {
  const styles = useStyles()

  const params = useParams()

  const id = params["id"]

  const [newFlag, setNewFlag] = useState<boolean>((id === null || id === undefined || id.length === 0))
  const [userId, setUserId] = useState<number | undefined>((!newFlag && id !== undefined) ? parseInt(id) : undefined)

  const [user, setUser] = useState<User | undefined>(newFlag ? ({} as User) : undefined)

  const onInit = useCallback(async () => {
    try {
      if (userId === undefined) {
        return
      }

      const api = new UsersApi(new ApiConfiguration())
      const res = await api.getUserDetail({ id: userId })
      setUser(res)
    }
    catch (ex) {
      console.error("api error", ex)
    }
  }, [setUser])

  const setAccount = useCallback((value: string) => {
    if (user !== undefined) {
      setUser({ ...user, account: value })
    }
  }, [user, setUser])

  const setEmail = useCallback((value: string) => {
    if (user !== undefined) {
      setUser({ ...user, email: value })
    }
  }, [user, setUser])

  const setName = useCallback((value: string) => {
    if (user !== undefined) {
      setUser({ ...user, userName: value })
    }
  }, [user, setUser])

  const onSave = useCallback(async () => {
    try {
      if (user === undefined) {
        throw Error("invalid parameter")
      }

      const api = new UsersApi(new ApiConfiguration())
      if (user.id === undefined) {
        const res = await api.createUser({ user: user })
        setNewFlag(false)
        setUserId(res.id)
        setUser(res)
      } else {
        const res = await api.updateUser({ id: user.id, user: user })
        setUser(res)
      }
    }
    catch (ex) {
      console.error("api error", ex)
    }
  }, [user, setUser])


  return (
    <PageFrame title={"User Detail"} onInit={!newFlag ? onInit : undefined}>
      <div>
        <a href="/intrawiki-manage/config/users">list...</a>
      </div>
      <>
        {user !== undefined &&
          <section>
            <div>
              <label className={styles.label}>Account</label>
              {newFlag &&
                <span className={styles.value} ><input type="text" value={user.account} onChange={e => setAccount(e.target.value)} /></span>
              }
              {!newFlag &&
                <span className={styles.value} >{user.account}</span>
              }
            </div>
            <div>
              <label className={styles.label}>Name</label>
              <span className={styles.value}><input type="text" value={user.userName} onChange={e => setName(e.target.value)} /></span>
            </div>
            <div>
              <label className={styles.label}>E-mail</label>
              <span className={styles.value}><input type="text" value={user.email} onChange={e => setEmail(e.target.value)} /></span>
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
    minHeight: 200,
  },
  label: {
    display: "inline-block",
    minWidth: 200,
    color: "white",
    backgroundColor: "darkgray",
    margin: 2,
  },
  value: {
    display: "inline-block",
    marginLeft: 10,
  },
})