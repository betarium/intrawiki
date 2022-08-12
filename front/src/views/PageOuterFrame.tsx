import { makeStyles } from "@material-ui/core";
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
    paddingLeft: 10,
    paddingRight: 10,
  },
})
