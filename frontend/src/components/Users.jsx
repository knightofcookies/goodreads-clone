import { useEffect, useState } from "react";
import usersService from "../services/users";
import User from "./User";
import AppBar from "./AppBar";
import Container from "@mui/material/Container";
import { useNavigate, useLoaderData } from "react-router-dom";
import CustomThemeProvider from "./CustomThemeProvider";

// TODO : Add error notifications

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    usersService
      .getAll()
      .then((returnedUsers) => {
        if (returnedUsers) {
          setUsers(returnedUsers);
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

  if (users.length === 0) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AppBar />
      <Container sx={{ p: 1 }}>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </Container>
    </CustomThemeProvider>
  );
};

export default Users;
