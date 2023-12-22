import { useState } from "react";
import Books from "./components/Books";
import Login from "./components/Login";
import AppBar from "./components/Material UI/AppBar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <AppBar />
      <Login user={user} setUser={setUser} />
      <Books />
    </>
  );
}

export default App;
