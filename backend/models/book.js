const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Librarian",
  }
});

bookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    if(returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;  
    }
    if(returnedObject.__v) {
      delete returnedObject.__v;
    }
  },
});
// TODO Fix this error : transform appears to be called twice, 
// necessitating the if statements

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
