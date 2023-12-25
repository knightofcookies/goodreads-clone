import { useEffect, useState } from "react";
import librariansService from "../services/librarians";
import Librarian from "./Librarian";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { useNavigate, useLoaderData } from "react-router-dom";

// TODO : Add error notifications

const Librarians = () => {
  const [librarians, setLibrarians] = useState([]);
  const { user } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    librariansService
      .getAll()
      .then((returnedLibrarians) => {
        if (returnedLibrarians) {
          setLibrarians(returnedLibrarians);
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

  if (librarians.length === 0) {
    return null;
  }

  return (
    <>
      <AppBar />
      <Container sx={{ p: 1 }}>
        {librarians.map((librarian) => (
          <Librarian key={librarian.id} librarian={librarian} />
        ))}
      </Container>
    </>
  );
};

export default Librarians;
