import { useEffect, useContext } from "react";
import UserContext from "./contexts/UserContext";
import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";

function App() {
  const [, userDispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedGoodreadsUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({
        type: "SET_USER",
        payload: user,
      });
    }
  }, [userDispatch]);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
