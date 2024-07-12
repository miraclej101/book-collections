import { useParams } from "react-router-dom";
import style from "./BookPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

export default function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const { state } = useAuth();
  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const user_id = state.user.id;
  /*
  const books = [
    {
      book_id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "The Great Gatsby is a novel by the American author F. Scott Fitzgerald. First published in 1925, it is set on Long Island's North Shore and in New York City from spring to autumn of 1922.",
      category: "Novel",
      publisher: "Charles Scribner's Sons",
      release_year: 1925,
    },
    {
      book_id: 2,
      title: "The Catcher in the Rye",
      author: "J. D. Salinger",
      description:
        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",
      category: "Novel",
      publisher: "Little, Brown and Company",
      release_year: 1951,
    },
  ];*/
  useEffect(() => {
    console.log(bookId);
    axios.get(`http://localhost:4000/books/${user_id}/${bookId}`).then((response) => {
        setBook(response.data.data);
    })
    .catch((error) => {
        console.log(error.message);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data= {
        user_id: user_id,
        book_id : bookId,
        title: book.title,
        author: book.author,
        description: book.description,
        category: book.category,
        publisher: book.publisher,
        release_year: book.release_year,
    }
    axios.put(`http://localhost:4000/books/update`, data).then((response) => {
        setSuccessMessage(response.data.message);
    })
    .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
    });
  };

  const handleMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
}

  return (
    <div className="container-fluid px-5 pt-5 my-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card border-0 rounded-3 shadow-lg overflow-hidden">
            <div className="card-body p-0">
              <div className="row g-0">
                <div
                  className={`col-sm-6 d-none d-sm-block ${style.bg_image}`}
                ></div>
                <div className="col-sm-6 p-4">
                  <div className="text-center">
                    <div className="h3 fw-light">Update Book</div>
                    <p className="mb-4 text-muted">You can update any field of your book.</p>
                  </div>
                  <form onSubmit={handleSubmit} >
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="title"
                        type="text"
                        placeholder="Title"
                        defaultValue={book.title}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        onBlur={handleMessages}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="author"
                        type="text"
                        placeholder="Author"
                        defaultValue={book.author}
                        onChange={(e)=> setBook({...book, author: e.target.value})}
                        onBlur={handleMessages}
                      />
                      <label htmlFor="author">Author</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control"
                        rows="6"
                        id="description"
                        placeholder="Description"
                        defaultValue={book.description}
                        onChange={(e) => setBook({ ...book, description: e.target.value })}
                        onBlur={handleMessages}
                      ></textarea>
                      <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="category"
                        type="text"
                        placeholder="Category"
                        defaultValue={book.category}
                        onChange={(e) => setBook({ ...book, category: e.target.value })}
                        onBlur={handleMessages}
                      />
                      <label htmlFor="category">Category</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="publisher"
                        type="text"
                        placeholder="Publisher"
                        defaultValue={book.publisher}
                        onChange={(e) => setBook({ ...book, publisher: e.target.value })}
                        onBlur={handleMessages}
                      />
                      <label htmlFor="publisher">Publisher</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="release_year"
                        type="number"
                        placeholder="Release Year"
                        defaultValue={book.release_year}
                        onChange={(e) => setBook({ ...book, release_year: e.target.value })}   
                        onBlur={handleMessages} 
                      />
                      <label htmlFor="release_year">Release Year</label>
                    </div>
                    <div class="text-success" id="submitSuccessMessage">
                      <div class="text-center mb-3">
                        <div class="fw-bolder">{succesMessage}</div>
                      </div>
                    </div>

                    <div class="text-danger" id="submitErrorMessage">
                      <div class="text-center text-danger mb-3">
                        {errorMessage}
                      </div>
                    </div>

                    <div class="d-grid">
                      <button
                        class="btn btn-primary btn-lg"
                        id="submitButton"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}