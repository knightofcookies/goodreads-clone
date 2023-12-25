import { useEffect, useState, useContext } from "react";
import booksService from "../services/books";
import UserContext from "../contexts/UserContext";
import Book from "./Book";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { redirect } from "react-router-dom";

// TODO : Add error notifications

const Books = () => {
  const [books, setBooks] = useState([]);
  const [user, userDispatch] = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    booksService.setToken(user.token);
    booksService
      .getAll()
      .then((returnedBooks) => {
        if (returnedBooks) {
          setBooks(returnedBooks);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.localStorage.removeItem("loggedGoodreadsUser");
            userDispatch({
              type: "RESET_USER",
            });
          }
        }
      });
  }, [user, userDispatch]);

  if (!user) {
    redirect("/login"); // DEBUG
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <>
      <AppBar />
      <Container sx={{ p: 1 }}>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Container>
    </>
  );
};

export default Books;
