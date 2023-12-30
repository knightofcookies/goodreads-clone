const managementRouter = require("express").Router();
const Book = require("../models/book");
const Librarian = require("../models/librarian");

managementRouter.post("/", async (req, res) => {
  const { title, author } = req.body;
  const librarian = req.librarian;

  if (!librarian) {
    return res.status(401).json({
      error: `you must be logged in as a librarian`,
    });
  }

  const book = new Book({
    title,
    author,
    contributor: librarian._id,
  });

  const savedBook = await book.save();
  librarian.contributions = librarian.contributions.concat(savedBook._id);
  await librarian.save();

  res.json(savedBook);
});

managementRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({
      error: `book with id ${id} not found`,
    });
  }
  if (!req.librarian) {
    return res.status(401).json({
      error: `you must be logged in as a librarian`,
    });
  }


  const librarian = await Librarian.findById(book.contributor);
  librarian.contributions = librarian.contributions.filter((b) => b !== id);
  await librarian.save();

  res.status(204).end();
});

managementRouter.get("/mycontributions", async (req, res) => {
  const librarian = req.librarian;
  
  if (!librarian) {
    return res.status(401).json({
      error: `you must be logged in as a contributor`,
    });
  }

  const contributions = await Librarian.findById(librarian.id).populate("contributions", [
    "title",
    "author",
  ]);
  
  res.json(contributions);
});

module.exports = managementRouter;
