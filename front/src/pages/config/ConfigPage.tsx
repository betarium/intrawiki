import { UserType } from "api";
import { AppContextDef } from "contexts/AppContext";
import { useContext } from "react";
import PageFrame from "views/PageFrame";

function ConfigPage() {
  const appContext = useContext(AppContextDef)
  const admin = appContext.authInfo?.userType === UserType.Admin

  return (
    <PageFrame title="Config">
      <>
        {admin &&
          <>
            <h2>User</h2>
            <div>
              <a href="/intrawiki-manage/config/users">User List</a>
            </div>
          </>
        }
      </>
      <h2>Profile</h2>
      <div>
        <a href="/intrawiki-manage/config/password">Change Password</a>
      </div>
    </PageFrame>
  );
}

export default ConfigPage;
