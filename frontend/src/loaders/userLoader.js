import { redirect } from "react-router-dom";

const getUserFromLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedGoodreadsUser");
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON);
  }
  return null;
};

const userLoader = async () => {
  const user = getUserFromLocalStorage();
  if (!user) {
    return redirect("/login");
  }
  return { user };
};

export default userLoader;

// TODO Decide if user state management using Context is vestigial
