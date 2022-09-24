import { makeStyles, shorthands } from "@griffel/react";
import { UserListResponse, UsersApi } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useState } from "react";
import PageFrame from "views/PageFrame";

function UserListPage() {
  const [list, setList] = useState<UserListResponse>()

  const onInit = useCallback(async () => {
    try {
      const api = new UsersApi(new ApiConfiguration())
      const list = await api.getUserList()
      setList(list)
    }
    catch (ex) {
      console.error("api error", ex)
    }
  }, [setList])

  const styles = useStyles()

  return (
    <PageFrame title={"User List"} onInit={onInit}>
      <div>
        <a href="/intrawiki-manage/config/users/add">add...</a>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Account</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Type</th>
            <th>Disabled</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {list?.items.map(item =>
            <tr key={"user-" + item.id} className={item.disabled ? styles.disabled : ""}>
              <td>{item.account}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.userType}</td>
              <td>{item.disabled ? "Disabled" : ""}</td>
              <td><a href={"/intrawiki-manage/config/users/" + item.id}>Detail</a></td>
            </tr>
          )}
        </tbody>
      </table>
    </PageFrame>
  )
}

export default UserListPage;

const useStyles = makeStyles({
  table: {
    borderCollapse: "collapse",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderColor("black"),
    ...shorthands.borderStyle("solid"),
    "& tr": {
      ...shorthands.borderWidth("1px"),
      ...shorthands.borderColor("black"),
      ...shorthands.borderStyle("solid"),
    },
    "& th": {
      ...shorthands.borderWidth("1px"),
      ...shorthands.borderColor("black"),
      ...shorthands.borderStyle("solid"),
      backgroundColor: "lightskyblue",
      ...shorthands.padding("4px"),
    },
    "& td": {
      ...shorthands.borderWidth("1px"),
      ...shorthands.borderColor("black"),
      ...shorthands.borderStyle("solid"),
      ...shorthands.padding("4px"),
    },
  },
  disabled: {
    backgroundColor: "silver",
  },
})
