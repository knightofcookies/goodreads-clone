import { useEffect, useState } from "react";
import contributorsService from "../services/contributors";
import Contributor from "./Contributor";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { useNavigate, useLoaderData } from "react-router-dom";
import CustomThemeProvider from "./CustomThemeProvider";

// TODO : Add error notifications

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const { user } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    contributorsService
      .getAll()
      .then((returnedContributors) => {
        if (returnedContributors) {
          setContributors(returnedContributors);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.localStorage.removeItem("loggedGoodreadsUser");
            navigate("/login", { replace: true });
          }
        }
      });
  }, [user, navigate]);

  if (contributors.length === 0) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AppBar />
      <Container sx={{ p: 1 }}>
        {contributors.map((contributor) => (
          <Contributor key={contributor.id} contributor={contributor} />
        ))}
      </Container>
    </CustomThemeProvider>
  );
};

export default Contributors;
