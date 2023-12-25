import AppBar from "./components/AppBar";
import Container from "@mui/material/Container";
import CustomThemeProvider from "./components/CustomThemeProvider";

function App() {
  return (
    <CustomThemeProvider>
      <AppBar />
      <Container>
        <p>This site is under construction.</p>
        {/* TODO Display home page text */}
      </Container>
    </CustomThemeProvider>
  );
}

export default App;
