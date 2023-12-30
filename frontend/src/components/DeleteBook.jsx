import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import managementService from "../services/management";
import { useNavigate, useLoaderData } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import ContributorAppBar from "./ContributorAppBar";
import CustomThemeProvider from "./CustomThemeProvider";
import Container from "@mui/material/Container";

const DeleteBook = () => {
  const [bookId, setBookId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { contributor } = useLoaderData();

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

  return (
    <CustomThemeProvider>
      <ContributorAppBar />
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
      </Container>
    </CustomThemeProvider>
  );
};

export default DeleteBook;
