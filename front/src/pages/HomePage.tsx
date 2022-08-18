import { useContext } from "react";
import PageOuterFrame from "views/PageOuterFrame";
import { AppContextDef } from "../contexts/AppContext";
import ContentsView from "../views/ContentsView";
import PageFrame from "../views/PageFrame";

function HomePage() {
  const appContext = useContext(AppContextDef)

  if (appContext.authInfo === undefined) {
    return (
      <PageFrame title="Home">
        <div>
          <a href="/intrawiki-manage/login">login</a>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageOuterFrame>
      <ContentsView />
    </PageOuterFrame>
  )
}

export default HomePage;
