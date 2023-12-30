import CustomThemeProvider from "./CustomThemeProvider";
import Container from "@mui/material/Container";
import { useLoaderData } from "react-router-dom";
import ContributorAppBar from "./ContributorAppBar";

const Manage = () => {
  const { contributor } = useLoaderData();

  return (
    <CustomThemeProvider>
      <ContributorAppBar />
      <Container>
        <p>Hello, {contributor.username}</p>
        <p>This site is under construction.</p>
        {/* TODO */}
      </Container>
    </CustomThemeProvider>
  );
};

export default Manage;
