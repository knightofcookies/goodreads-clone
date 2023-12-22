import { useEffect, useState } from "react";
import booksService from "../services/books";
import Book from "./Book";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";

// TODO : Add error notifications

const Books = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    try {
      booksService.setToken(user.token);
      booksService.getAll().then((returnedBooks) => {
        if (returnedBooks) {
          setBooks(returnedBooks);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  if (books.length === 0) {
    return null;
  }

  return (
    <Container sx={{ p: 1, backgroundColor: blue[600] }}>
      <Paper sx={{ p: 1, backgroundColor: blue.A200 }} elevation={12}>
        <Typography variant="h5" component="h3" color={"white"} gutterBottom>
          All books on Goodreads
        </Typography>
      </Paper>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </Container>
  );
};

export default Books;
