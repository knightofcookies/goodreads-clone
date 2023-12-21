const booksRouter = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");

booksRouter.get("/", async (req, res) => {
  const books = await Book.find();
  response.json(books);
});

booksRouter.post("/:id", async (req, res) => {
  const id = req.params.id;
  const user = request.user;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      error: `book with id ${id} not found`,
    });
  }

  user.books = user.books.concat(book._id);
  await user.save();

  response.status(201).end();
});

module.exports = booksRouter;
