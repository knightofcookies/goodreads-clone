import { redirect } from "react-router-dom";

const getContributorFromLocalStorage = () => {
  const loggedContributorJSON = window.localStorage.getItem("loggedGoodreadsContributor");
  if (loggedContributorJSON) {
    return JSON.parse(loggedContributorJSON);
  }
  return null;
};

const contributorLoginLoader = async () => {
  const contributor = getContributorFromLocalStorage();
  if (contributor) {
    return redirect("/manage");
  }
  return { contributor };
};

export default contributorLoginLoader;
