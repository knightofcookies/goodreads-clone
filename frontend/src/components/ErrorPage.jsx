import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouteError } from "react-router-dom";

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
      <Typography variant="subtitle" style={{ color: "white" }}>
        {error.statusText || error.message}
      </Typography>
      <Button variant="contained">Back Home</Button>
    </Box>
  );
}
