import PageFrame from "views/PageFrame";

function ConfigPage() {
  return (
    <PageFrame title="Config">
      <h2>User</h2>
      <div>
        <a href="/intrawiki-manage/config/users">User List</a>
      </div>
      <h2>Profile</h2>
      <div>
        <a href="/intrawiki-manage/config/password">Change Password</a>
      </div>
    </PageFrame>
  );
}

export default ConfigPage;
