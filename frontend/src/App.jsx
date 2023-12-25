import { useEffect, useContext } from "react";
import UserContext from "./contexts/UserContext";
import AppBar from "./components/AppBar";
import { Outlet, useLoaderData } from "react-router-dom";


function App() {
  const { user } = useLoaderData();

  const [, userDispatch] = useContext(UserContext);

  useEffect(() => {
    userDispatch({
      type: "SET_USER",
      payload: user,
    });
  }, [user, userDispatch]);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
