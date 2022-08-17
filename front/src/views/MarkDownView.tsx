import { makeStyles } from "@material-ui/core";

interface MarkDownState {
  codeMode: boolean
  listMode: boolean
  indent: number
  buffer: string[]
}

enum MarkDownElementType {
  text,
  code,
  codeText,
  header1,
  header2,
  header3,
  header4,
  header5,
  link,
  keyword,
  line,
  list,
}

interface MarkDownElement {
  type: MarkDownElementType
  text?: string
  link?: string
  start?: boolean
  end?: boolean
}

function MarkDownView(props: { contents: string }) {
  const lines = props.contents.replaceAll("\r\n", "\n").split("\n")
  const state = { codeMode: false, listMode: false, indent: 0, buffer: [] } as MarkDownState
  const elementsArray = lines.map(line => parseMarkDownLine(line, state))

  const elements: MarkDownElement[] = []
  elementsArray.forEach(item => {
    item.forEach(q => elements.push(q))
  })

  return (
    <div className="MarkDown">
      {elements.map((item, index) =>
        <MarkDownLineView element={item} elementIndex={index} elementList={elements} />
      )}
    </div>
  )
}

export default MarkDownView;

function parseMarkDownLine(line: string, state: MarkDownState): MarkDownElement[] {
  console.debug("line: " + line)

  const elements: MarkDownElement[] = []

  if (state.codeMode) {
    console.warn("code mode check!!")
    if (line.startsWith("```")) {
      state.codeMode = false
      const item = { type: MarkDownElementType.code, end: true } as MarkDownElement
      elements.push(item)
    }
    else {
      const item = { text: line, type: MarkDownElementType.codeText } as MarkDownElement
      elements.push(item)
    }
    return elements
  }

  if (line === "") {
    if (state.listMode) {
      state.listMode = false
      const item = { type: MarkDownElementType.list, end: true } as MarkDownElement
      elements.push(item)
    }
  }
  else if (line.startsWith("#")) {
    const sub = line.replace(new RegExp("^[#]+"), "")
    const head = line.length - sub.length
    if (head <= 1) {
      const item = { type: MarkDownElementType.header1, text: sub } as MarkDownElement
      elements.push(item)
    }
    else if (head === 2) {
      const item = { type: MarkDownElementType.header2, text: sub } as MarkDownElement
      elements.push(item)
    }
    else if (head === 3) {
      const item = { type: MarkDownElementType.header3, text: sub } as MarkDownElement
      elements.push(item)
    }
    else if (head === 4) {
      const item = { type: MarkDownElementType.header4, text: sub } as MarkDownElement
      elements.push(item)
    }
    else {
      const item = { type: MarkDownElementType.header5, text: sub } as MarkDownElement
      elements.push(item)
    }
  }
  else if (line.startsWith("```")) {
    const item = { type: MarkDownElementType.code, start: true } as MarkDownElement
    elements.push(item)
    state.codeMode = true
  }
  else if (line.startsWith("---")) {
    const item = { type: MarkDownElementType.line } as MarkDownElement
    elements.push(item)
    state.codeMode = true
  }
  else if (line.startsWith("*")) {
    const sub = line.substring(1)
    const item = { type: MarkDownElementType.list, text: sub, start: true } as MarkDownElement
    elements.push(item)
    state.listMode = true
  }
  else {
    var index = 0
    var linkStart = -1
    var keywordStart = -1
    var textStart = -1
    var textEnd = -1
    var linkText: string | undefined = undefined

    while (index < line.length) {
      const ch = line.charAt(index)
      if (ch === "[") {
        console.warn("link start:" + index)
        textEnd = index
        if (linkStart !== -1 && linkStart === index) {
          console.warn("keyword start:" + index)
          linkStart = -1
          keywordStart = index + 1
        } else {
          linkStart = index + 1
        }
      }
      else if (ch === "(" && linkStart !== -1) {
        linkStart = index + 1
      }
      else if (ch === ")" && linkStart !== -1) {
        const sub = line.substring(linkStart, index)
        const item = { type: MarkDownElementType.link, text: linkText, link: sub } as MarkDownElement
        elements.push(item)
        linkStart = -1
      }
      else if (ch === "]" && linkStart !== -1) {
        console.warn("link end:" + index)
        const sub = line.substring(linkStart, index)
        linkText = sub
        // const item = { type: MarkDownElementType.link, text: sub } as MarkDownElement
        // elements.push(item)
        // linkStart = -1
      }
      else if (ch === "]" && index + 1 < line.length && line.charAt(index + 1) === "]" && keywordStart !== -1) {
        console.warn("keyword end:" + index)
        const sub = line.substring(keywordStart, index)
        console.warn("keyword:" + sub)
        const item = { type: MarkDownElementType.keyword, text: sub } as MarkDownElement
        elements.push(item)
        index++
        keywordStart = -1
      }
      else if (textStart === -1 && linkStart === -1 && keywordStart === -1) {
        textStart = index
      }

      if (textEnd !== -1) {
        if (textStart !== -1 && textStart < textEnd) {
          const sub = line.substring(textStart, textEnd)
          const item = { type: MarkDownElementType.text, text: sub } as MarkDownElement
          elements.push(item)
        }
        textStart = -1
        textEnd = -1
      }
      index++
    }

    if (textStart !== -1) {
      const sub = line.substring(textStart, index)

      if (sub.length > 0) {
        const item = { type: MarkDownElementType.text, text: sub } as MarkDownElement
        elements.push(item)
      }
    }
  }

  return elements
}

function MarkDownLineView(props: { element: MarkDownElement, elementIndex: number, elementList: MarkDownElement[] }) {
  const line = props.element.text
  const styles = useStyles()
  const element = props.element

  if (element.type === MarkDownElementType.header1) {
    return <h1 className={styles.header1}>
      {line}
    </h1>
  }
  else if (element.type === MarkDownElementType.header2) {
    return <h2 className={styles.header2}>
      {line}
    </h2>
  }
  else if (element.type === MarkDownElementType.header3) {
    return <h3 className={styles.header3}>
      {line}
    </h3>
  }
  else if (element.type === MarkDownElementType.header4) {
    return <h4 className={styles.header4}>
      {line}
    </h4>
  }
  else if (element.type === MarkDownElementType.header5) {
    return <h5 className={styles.header5}>
      {line}
    </h5>
  }
  else if (element.type === MarkDownElementType.code && element.start) {
    return <></>
  }
  else if (element.type === MarkDownElementType.code && element.end) {
    let start = -1
    for (let tmp = props.elementIndex - 1; tmp > 0; tmp--) {
      if (props.elementList[tmp].type === MarkDownElementType.code && props.elementList[tmp].start) {
        start = tmp + 1
        break
      }
    }

    const tmpList: MarkDownElement[] = []
    if (start !== -1) {
      for (let tmp = start; tmp < props.elementIndex; tmp++) {
        tmpList.push(props.elementList[tmp])
      }
    }

    return <code className={styles.code}>
      {tmpList.map(item => <>{item.text}{"\r\n"}</>)}
    </code>
  }
  else if (element.type === MarkDownElementType.codeText) {
    return <></>
  }
  else if (element.type === MarkDownElementType.keyword) {
    return <a href={"/" + encodeURI(element.text ?? "")}>{element.text}</a>
  }
  else if (element.type === MarkDownElementType.link) {
    return <a href={element.link} target="_blank" rel="noreferrer">{element.text}</a>
  }
  else if (element.type === MarkDownElementType.line) {
    return <hr />
  }
  else {
    return (
      <div>
        {line}
      </div>
    )
  }
}

const useStyles = makeStyles({
  header1: {
    backgroundColor: "mediumblue",
    paddingLeft: 4,
    color: "white",
  },
  header2: {
    // borderBottomColor: "lightblue",
    // borderBottomWidth: 2,
    // borderBottomStyle: "solid",
    borderLeftColor: "cornflowerblue",
    borderLeftWidth: 4,
    borderLeftStyle: "solid",
    paddingLeft: 4,
    background: "linear-gradient(to right, cornflowerblue, white)"
    // backgroundColor: "lightblue",
    // borderBottomColor: "darkblue",
    // borderBottomWidth: 2,
    // borderBottomStyle: "solid",
    // borderLeftColor: "darkblue",
    // borderLeftWidth: 2,
    // borderLeftStyle: "solid",
    // paddingLeft: 4,
  },
  header3: {
    // borderBottomColor: "darkblue",
    borderLeftColor: "cornflowerblue",
    borderLeftWidth: 4,
    borderLeftStyle: "solid",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    paddingLeft: 4,
    borderImage: "linear-gradient(to right, cornflowerblue 0%, white 100%)",
    borderImageSlice: 1,
  },
  header4: {
    // backgroundColor: "lightblue",
    // borderBottomColor: "darkblue",
    // borderBottomWidth: 2,
    // borderBottomStyle: "solid",
    borderLeftColor: "cornflowerblue",
    borderLeftWidth: 4,
    borderLeftStyle: "solid",
    paddingLeft: 4,
  },
  header5: {
    textDecorationLine: "underline",
    textDecorationColor: "cornflowerblue",
    textDecorationThickness: 2,
    paddingLeft: 4,
  },
  code: {
    display: "block",
    backgroundColor: "silver",
    whiteSpace: "pre-wrap",
    marginTop: 10,
    marginBottom: 10,
  }
})
