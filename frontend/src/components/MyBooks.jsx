import { useEffect, useState } from "react";
import booksService from "../services/books";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { useNavigate, useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// TODO : Add error notifications

// TODO : Add remove from bookshelf button

const SelectedListItem = ({ books }) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleListItemClick = (event, id) => {
    setSelectedId(id);
  };

  if (!books) {
    return null; // TODO Display a message when there are no books
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="books">
        {books.map((book) => {
          return (
            <ListItemButton
              key={book.id}
              selected={selectedId === book.id}
              onClick={(event) => handleListItemClick(event, book.id)}
            >
              <ListItemText primary={book.title} secondary={book.author} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const { user } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    booksService.setToken(user.token);
    booksService
      .getBookshelf()
      .then((returnedUser) => {
        if (returnedUser) {
          setBooks(returnedUser.books);
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

  return (
    <>
      <AppBar />
      <Container sx={{ p: 1 }}>
        <SelectedListItem books={books} />
      </Container>
    </>
  );
};

export default MyBooks;
