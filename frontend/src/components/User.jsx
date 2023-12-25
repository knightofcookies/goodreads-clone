import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

const SelectedListItem = ({ books }) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleListItemClick = (event, id) => {
    setSelectedId(id);
  };

  if (!books) {
    return null;
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

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <Container sx={{ p: 1 }}>
      <Paper variant="outlined">
        <Typography component="h6" variant="h6" sx={{ p: 1 }}>
          {user.username}
        </Typography>
        <SelectedListItem books={user.books} />
      </Paper>
    </Container>
  );
};

export default User;
