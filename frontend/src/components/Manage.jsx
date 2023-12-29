import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import managementService from "../services/management";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import CustomThemeProvider from "./CustomThemeProvider";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useLoaderData, useNavigate } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";
import Button from "@mui/material/Button";

const Manage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const { contributor } = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = (event) => {
    event.preventDefault();
    if (!bookId) {
      setErrorMessage("Book ID must not be blank");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    managementService.setToken(contributor.token);
    managementService
      .deleteBook(bookId)
      .then(() => {
        setBookId("");
        setSuccessMessage(`Deleted book ${bookId} successfully`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.localStorage.removeItem("loggedGoodreadsContributor");
          navigate("/manage/login");
        } else if (error.response.data.error) {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage(
            "Error logging in : Please check the console for more details"
          );
          console.error(error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!bookTitle) {
      setErrorMessage("Book Title must not be blank");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    if (!bookAuthor) {
      setErrorMessage("Book Author must not be blank");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    const book = {
      title: bookTitle,
      author: bookAuthor,
    };
    managementService.setToken(contributor.token);
    managementService
      .createBook(book)
      .then((book) => {
        setBookTitle("");
        setBookAuthor("");
        setSuccessMessage(
          `Created a new book book with id ${book.id} successfully`
        );
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.localStorage.removeItem("loggedGoodreadsContributor");
          navigate("/manage/login");
        } else if (error.response.data.error) {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage(
            "Error logging in : Please check the console for more details"
          );
          console.error(error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  };

  return (
    <CustomThemeProvider>
      <ErrorMessage errorMessage={errorMessage} />
      <SuccessMessage successMessage={successMessage} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper variant="outlined" sx={{ m: 1 }}>
          <Typography component="h6" variant="h6" sx={{ m: 1 }}>
            Delete a book
          </Typography>
          <Divider />
          <Box
            component="form"
            onSubmit={handleDelete}
            noValidate
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              id="bookId"
              label="Book ID"
              name="bookId"
              sx={{ m: 1 }}
              value={bookId}
              onChange={(event) => setBookId(event.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ m: 1 }}>
              Delete
            </Button>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Typography component="h6" variant="h6" sx={{ m: 1 }}>
            Add a book
          </Typography>
          <Divider />
          <Box
            component="form"
            onSubmit={handleAdd}
            noValidate
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              id="bookTitle"
              label="Book Title"
              name="bookTitle"
              sx={{ m: 1 }}
              value={bookTitle}
              onChange={(event) => setBookTitle(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              id="bookAuthor"
              label="Book Author"
              name="bookAuthor"
              sx={{ m: 1 }}
              value={bookAuthor}
              onChange={(event) => setBookAuthor(event.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ m: 1 }}>
              Add
            </Button>
          </Box>
        </Paper>
      </Container>
    </CustomThemeProvider>
  );
};

export default Manage;
