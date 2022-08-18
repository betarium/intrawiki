import { makeStyles } from "@material-ui/core";
import { UserListResponse, UsersApi } from "api";
import ApiConfiguration from "common/ApiConfiguration";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import PageFrame from "views/PageFrame";

function UserListPage() {
  const styles = useStyles()
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

  return (
    <PageFrame title={"User List"} onInit={onInit}>
      <div>
        <a href="/intrawiki-manage/config/users/add">add...</a>
      </div>
      <table>
        <tr>
          <th>Account</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Disabled</th>
          <th>Detail</th>
        </tr>
        {list?.items.map(item =>
          <tr>
            <td>{item.account}</td>
            <td>{item.userName}</td>
            <td>{item.email}</td>
            <td>{item.disabled}</td>
            <td><a href={"/intrawiki-manage/config/users/" + item.id}>Detail</a></td>
          </tr>
        )}
      </table>
    </PageFrame>
  )
}

export default UserListPage;

const useStyles = makeStyles({
  contents: {
    width: "100%",
    minHeight: 200,
  },
})
