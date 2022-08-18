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

  return (
    <PageFrame title={"User List"} onInit={onInit}>
      <div>
        <a href="/intrawiki-manage/config/users/add">add...</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Disabled</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {list?.items.map(item =>
            <tr key={"user-" + item.id}>
              <td>{item.account}</td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.disabled}</td>
              <td><a href={"/intrawiki-manage/config/users/" + item.id}>Detail</a></td>
            </tr>
          )}
        </tbody>
      </table>
    </PageFrame>
  )
}

export default UserListPage;
