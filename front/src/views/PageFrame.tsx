import { makeStyles } from "@griffel/react";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import PageOuterFrame from "./PageOuterFrame";

interface PageFrameProps {
  title: string
  children: ReactElement | ReactElement[]
  onInit?: () => {}
}

function PageFrame(props: PageFrameProps) {
  const init = useRef(false);
  const styles = useStyles()
  const [initialized, setInitialized] = useState(props.onInit === undefined)

  const onInit = useCallback(async () => {
    if (init.current) {
      return
    }
    init.current = true

    if (props.onInit === undefined) {
      return
    }

    try {
      await props.onInit()
    }
    catch (ex) {
      console.error("page error", ex)
    }

    setInitialized(true)
  }, [props])

  useEffect(() => {
    if (props.onInit !== undefined) {
      onInit()
    }
  }, [onInit, props])

  return (
    <PageOuterFrame>
      <>
        <h1 className={styles.PageTitle} >{props.title}</h1>
        {!initialized &&
          <div className={styles.PageFrameContents}>
            <div>Loading...</div>
          </div>
        }
        {initialized &&
          <div className={styles.PageFrameContents}>
            {props.children}
          </div>
        }
      </>
    </PageOuterFrame>
  )
}

export default PageFrame;

const useStyles = makeStyles({
  PageTitle: {
    backgroundColor: "mediumblue",
    paddingLeft: "4px",
    color: "white",
  },
  PageFrame: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  PageFrameContents: {
    paddingLeft: "10px",
    paddingRight: "10px",
  }
})
