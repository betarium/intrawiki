import { makeStyles } from "@griffel/react";
import { ReactElement } from "react";

function PageOuterFrame(props: { children: ReactElement }) {
  const styles = useStyles()
  return (
    <main className={styles.PageFrame}>
      {props.children}
    </main>
  )
}

export default PageOuterFrame;

const useStyles = makeStyles({
  PageFrame: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
})
