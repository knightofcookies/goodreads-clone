const booksRouter = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");

booksRouter.get("/", async (req, res) => {
  const books = await Book.find();
  response.json(books);
});

booksRouter.post("/", async (req, res) => {
  // TODO
});

module.exports = booksRouter;
