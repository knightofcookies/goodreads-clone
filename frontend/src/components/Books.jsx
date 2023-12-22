import { useEffect, useState } from "react";
import booksService from "../services/books";
import Book from "./Book";

// TODO : Add error notifications

const Books = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    booksService.setToken(user.token);
    try {
      booksService.getAll().then((returnedBooks) => {
        if(returnedBooks) {
          setBooks(returnedBooks);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  if (books.length === 0) {
    return null;
  }

  return (
    <div>
      {books.map(
        book => <Book key={book.id} book={book} />
      )}
    </div>
  );
};

export default Books;
