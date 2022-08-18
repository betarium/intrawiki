import PageFrame from "views/PageFrame";

function ConfigPage() {
  return (
    <PageFrame title="Config">
      <h2>User</h2>
      <div>
        <a href="/intrawiki-manage/config/users">User List</a>
      </div>
    </PageFrame>
  );
}

export default ConfigPage;
