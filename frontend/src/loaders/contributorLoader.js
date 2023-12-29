import { redirect } from "react-router-dom";

const getContributorFromLocalStorage = () => {
  const loggedContributorJSON = window.localStorage.getItem("loggedGoodreadsContributor");
  if (loggedContributorJSON) {
    return JSON.parse(loggedContributorJSON);
  }
  return null;
};

const contributorLoader = async () => {
  const contributor = getContributorFromLocalStorage();
  if (!contributor) {
    return redirect("/manage/login");
  }
  return { contributor };
};

export default contributorLoader;
