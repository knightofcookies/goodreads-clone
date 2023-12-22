import { useState } from "react";
import loginService from "../services/login";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    loginService
      .login(credentials)
      .then(user => {
        setUser(user);
        window.localStorage.setItem("loggedGoodreadsUser", JSON.stringify(user));
      })
      .catch(error => {
        console.error(error);
      });
  };

  if(user) {
    return (
      <div>
        <p>Logged in as <b>user.username</b></p>
      </div>
    );
  }

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username </label>
        <input type="text" id="username" onChange={(event) => setUsername(event.target.value)}/>
        <br />
        <label htmlFor="password">Password </label>
        <input type="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
        <br />
        <Button type="submit" variant="contained">Submit</Button>
        <Button type="reset" variant="outlined">Reset</Button>
        </form>
    </Container>
  );
};

export default Login;
