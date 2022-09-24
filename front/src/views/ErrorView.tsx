import { makeStyles, shorthands } from "@griffel/react"

interface ErrorViewProps {
  message?: string
}

export default function ErrorView(props: ErrorViewProps) {
  const styles = useStyles()

  if (props.message === undefined || props.message.length === 0) {
    return <></>
  }

  return (
    <div className={styles.ErrorView}>
      <div className={styles.ErrorViewMessage}>
        <h2 className={styles.ErrorViewTitle}>ERROR</h2>
        {props.message}
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  ErrorView: {
  },
  ErrorViewTitle: {
    ...shorthands.margin("0"),
    marginBottom: "4px",
  },
  ErrorViewMessage: {
    display: "inline-block",
    minWidth: "400px",
    ...shorthands.borderWidth("1px"),
    ...shorthands.borderColor("brown"),
    ...shorthands.borderStyle("solid"),
    ...shorthands.padding("4px"),
    minHeight: "60px",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "mistyrose",
    fontWeight: "bold",
  },
})
