import { useEffect, useState } from "react";
import Books from "./components/Books";
import Login from "./components/Login";
import AppBar from "./components/AppBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedGoodreadsUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <>
      <AppBar/>
      <Login user={user} setUser={setUser} />
      <Books user={user} />
    </>
  );
}

export default App;
