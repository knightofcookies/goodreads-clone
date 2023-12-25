import { useEffect, useState } from "react";
import booksService from "../services/books";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { useNavigate, useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";

// TODO : Add error notifications

const BookActionButton = ({
  userBooks,
  id,
  addBookToShelf,
  removeBookFromShelf,
}) => {
  if (!userBooks.find((b) => b === id)) {
    return (
      <Button variant="contained" onClick={() => addBookToShelf(id)}>
        Add
      </Button>
    );
  } else {
    return (
      <Button variant="contained" onClick={() => removeBookFromShelf(id)}>
        Remove
      </Button>
    );
  }
};

const SelectedListItem = ({
  userBooks,
  books,
  addBookToShelf,
  removeBookFromShelf,
}) => {
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
              <BookActionButton
                id={book.id}
                userBooks={userBooks}
                removeBookFromShelf={removeBookFromShelf}
                addBookToShelf={addBookToShelf}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState(user.books);

  const addBookToShelf = async (id) => {
    booksService.setToken(user.token);
    try {
      await booksService.addToShelf(id);
      let newUser = user;
      newUser.books = user.books.concat(id);
      window.localStorage.setItem("loggedGoodreadsUser", JSON.stringify(newUser));
      setUserBooks(newUser.books);
    } catch (exception) {
      console.error(exception); // TODO Handle errors
    }
  };

  const removeBookFromShelf = async (id) => {
    booksService.setToken(user.token);
    try {
      await booksService.removeFromShelf(id);
      let newUser = user;
      newUser.books = user.books.filter((b) => b !== id);
      window.localStorage.setItem("loggedGoodreadsUser", JSON.stringify(newUser));
      setUserBooks(newUser.books);
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
            navigate("/login", { replace: true });
          }
        }
      });
  }, [user, navigate]);

  return (
    <>
      <AppBar />
      <Container sx={{ p: 1 }}>
        <SelectedListItem
          books={books}
          addBookToShelf={addBookToShelf}
          removeBookFromShelf={removeBookFromShelf}
          userBooks={userBooks}
        />
      </Container>
    </>
  );
};

export default Books;
