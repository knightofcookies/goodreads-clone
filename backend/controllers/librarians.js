const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const librariansRouter = require("express").Router();
const Librarian = require("../models/librarian");

librariansRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const librarian = await Librarian.findOne({ username });
  const passwordCorrect =
    librarian === null
      ? false
      : await bcrypt.compare(password, librarian.passwordHash);

  if (!librarian) {
    return response.status(401).json({
      error: "invalid username",
    });
  }
  if (!passwordCorrect) {
    return response.status(401).json({
      error: "invalid password",
    });
  }

  const librarianForToken = {
    username: librarian.username,
    id: librarian._id,
  };

  const token = jwt.sign(librarianForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: librarian.username, id: librarian._id });
});

librariansRouter.post("/signup", async (request, response) => {
  const { username, password, key } = request.body;

  if (key !== process.env.ACCESS_KEY) {
    response.status(401).json({
      error: "missing authorization key",
    });
  }

  if (username.length < 3 || password.length < 3) {
    response.status(400).json({
      error: "username and password should each be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const librarian = new Librarian({
    username,
    passwordHash,
  });

  const savedLibrarian = await librarian.save();

  response.status(201).json(savedLibrarian);
});

librariansRouter.get("/", async (request, response) => {
  const librarians = await Librarian.find({}).populate("books", {
    title: 1,
    author: 1,
  });
  response.json(librarians);
});

module.exports = librariansRouter;
