import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Book = ({ book }) => {
  return (
    <Container sx={{ p: 1 }}>
      <Paper variant="outlined">
        <Typography component="p" variant="overline" sx={{ p: 1 }}>
          <b>{book.title}</b>, <i>{book.author}</i>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Book;
