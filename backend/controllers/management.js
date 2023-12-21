const managementRouter = require("express").Router();
const Book = require("../models/book");
const Librarian = require("../models/librarian");

managementRouter.post("/", async (req, res) => {
  const { title, author } = req.body;
  const librarian = req.librarian;

  const book = new Book({
    title,
    author,
    contributor: librarian,
  });

  const savedBook = await book.save();
  librarian.contributions = librarian.contributions.concat(savedBook._id);
  await librarian.save();

  response.json(savedBook);
});

managementRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({
      error: `book with id ${id} not found`,
    });
  }

  const librarian = await Librarian.findById(book.contributor);
  librarian.contributions = librarian.contributions.filter((b) => b !== id);
  await librarian.save();

  response.status(204).end();
});

module.exports = managementRouter;
