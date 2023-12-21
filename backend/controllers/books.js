const booksRouter = require("express").Router();
const Book = require("../models/book");

booksRouter.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

booksRouter.post("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      error: `book with id ${id} not found`,
    });
  }

  if(!user) {
    return res.status(401).json({
      error: `you must be logged in as a user`,
    });
  }

  if(user.books.find(b => b.toString() === id)) {
    return res.status(304).end();
  }

  user.books = user.books.concat(book._id);
  await user.save();

  res.status(201).end();
});

booksRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  if(!user) {
    return res.status(401).json({
      error: `you must be logged in as a user`,
    });
  }


  if (!user.books.find(b => b.toString() === id)) {
    return res.status(404).json({
      error: `book with id ${id} not on bookshelf`,
    });
  }

  user.books = user.books.filter(b => b.toString() !== id);
  await user.save();

  res.status(204).end();
});

module.exports = booksRouter;
