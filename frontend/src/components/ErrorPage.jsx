import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import blue from "@mui/material/colors/blue";
import { useRouteError, Link as RouterLink } from "react-router-dom";

const primary = blue[500];

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "98vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        Oops!
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="" style={{ color: "white", margin: 15 }}>
        Error : {error.statusText || error.message}
      </Typography>
      <Button variant="contained" component={RouterLink} to="/  ">Home</Button>
    </Box>
  );
}
