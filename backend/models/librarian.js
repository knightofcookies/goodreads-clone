const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const librarianSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  books: [ // Contributions
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

// TODO : Add email-based accounts and backend email validation

librarianSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

librarianSchema.plugin(uniqueValidator);

const Librarian = mongoose.model("Librarian", librarianSchema);

module.exports = Librarian;
