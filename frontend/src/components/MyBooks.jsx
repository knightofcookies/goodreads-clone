import { useEffect, useState } from "react";
import booksService from "../services/books";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { useNavigate, useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CustomThemeProvider from "./CustomThemeProvider";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

// TODO : Add error notifications

// TODO : Add remove from bookshelf button

const SelectedListItem = ({ books, removeBookFromShelf }) => {
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeBookFromShelf(book.id)}
              >
                Remove
              </Button>
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

  const removeBookFromShelf = async (id) => {
    booksService.setToken(user.token);
    try {
      await booksService.removeFromShelf(id);
      setBooks(books.filter((b) => b !== id));
    } catch (exception) {
      console.error(exception); // TODO Handle errors
    }
  };

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
    <CustomThemeProvider>
      <AppBar />
      <Container sx={{ p: 1 }}>
        <Typography variant="h4" component="h4">
          My Books
        </Typography>
        <Divider />
        <SelectedListItem
          books={books}
          removeBookFromShelf={removeBookFromShelf}
        />
      </Container>
    </CustomThemeProvider>
  );
};

export default MyBooks;
