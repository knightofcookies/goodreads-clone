import { useEffect, useState } from "react";
import managementService from "../services/management";
import ContributorAppBar from "./ContributorAppBar";
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

const SelectedListItem = ({ books, deleteBook }) => {
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
                onClick={() => deleteBook(book.id)}
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

const MyContributions = () => {
  const [books, setBooks] = useState([]);
  const { contributor } = useLoaderData();
  const navigate = useNavigate();

  const deleteBook = async (id) => {
    managementService.setToken(contributor.token);
    try {
      await managementService.deleteBook(id);
      setBooks(books.filter((b) => b !== id));
    } catch (exception) {
      console.error(exception); // TODO Handle errors
    }
  };

  useEffect(() => {
    if (!contributor) {
      return;
    }
    managementService.setToken(contributor.token);
    managementService
      .getContributions()
      .then((returnedContributor) => {
        if (returnedContributor) {
          setBooks(returnedContributor.contributions);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.localStorage.removeItem("loggedGoodreadsContributor");
            navigate("/login", { replace: true });
          }
        }
      });
  }, [contributor, navigate]);

  return (
    <CustomThemeProvider>
      <ContributorAppBar />
      <Container sx={{ p: 1 }}>
        <Typography variant="h5" component="h5">
          My Contributions
        </Typography>
        <Divider />
        <SelectedListItem books={books} deleteBook={deleteBook} />
      </Container>
    </CustomThemeProvider>
  );
};

export default MyContributions;
