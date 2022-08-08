import { useCallback, useState } from "react";
import useLocationQuery from "../common/useLocationQuery";

interface PageRequest {
  title: string
  contents?: string
}

function EditPage() {
  const query = useLocationQuery()
  const path = query.get("page")

  const [contents, setContents] = useState("")

  const onSave = useCallback(async () => {
    const data = { title: path, contents: contents } as PageRequest
    const result = await fetch("/api/pages/save",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )
  }, [path, contents])

  return (
    <div className="App">
      <h1>Edit</h1>
      <header className="App-header">
        <div>
          <textarea onChange={(e) => setContents(e.target.value)} >{contents}</textarea>
        </div>
        <div>
          <button onClick={() => onSave()} >Save</button>
        </div>
        <div>
          <a href="/">top</a>
        </div>
      </header>
    </div>
  );
}

export default EditPage;
