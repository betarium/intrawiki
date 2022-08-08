import { useLocation } from "react-router";

function NotFoundPage() {
  const location = useLocation()
  return (
    <div className="App">
      <h1>Not Found</h1>
      <header className="App-header">
        <a href={"/edit?page=" + encodeURIComponent(location.pathname)}>edit</a>
      </header>
    </div>
  );
}

export default NotFoundPage;
