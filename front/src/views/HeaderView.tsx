import { makeStyles } from "@griffel/react";
import { useContext } from "react";
import { AppContextDef } from "../contexts/AppContext";

function HeaderView() {
  const styles = useStyles()
  const appContext = useContext(AppContextDef)

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h1 className={styles.headerTitle}><a href="/">IntraWiki</a></h1>
        <div className={styles.headerAction}>
          {appContext.authInfo?.loggedIn &&
            <>
              <span>
                User: {appContext.authInfo?.account}
              </span>
              <span>
                <a href="/intrawiki-manage/config">Config</a>
              </span>
              <span>
                <a href="/Help">Help</a>
              </span>
              <span>
                <a href="/intrawiki-manage/logout">Logout</a>
              </span>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default HeaderView;

const useStyles = makeStyles({
  header: {
    width: "100%",
    height: "20px",
    backgroundColor: "silver",
    marginBottom: "4px",
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerTitle: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: "4px",
    fontSize: "16px",
    display: "inline-block",
    justifySelf: "flex-start",
  },
  headerAction: {
    display: "flex",
    justifySelf: "flex-end",
    paddingRight: "10px",
    gridGap: "10px",
  },
})
