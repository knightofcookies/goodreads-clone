import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import Books from "./components/Books.jsx";
import userLoader from "./utils/userLoader.js";
import loginLoader from "./utils/loginLoader.js";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Contributors from "./components/Contributors.jsx";
import MyBooks from "./components/MyBooks.jsx";
import SignUp from "./components/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/books",
    element: <Books />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/users",
    element: <Users />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/contributors",
    element: <Contributors />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/mybooks",
    element: <MyBooks />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
