import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import style from "./AddBookPage.module.css";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AddBookPage() {
  const { state } = useAuth();
 // console.log("state", state);
  const user_id = state.user ? state.user.id : null;
  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    publisher: "",
    release_year: "",
    user_id: user_id,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        title: book.title,
        author: book.author,
        description: book.description,
        category: book.category,
        publisher: book.publisher,
        release_year: book.release_year,
        user_id: user_id,
    }
    axios.post(`http://localhost:4000/books/create`, data).then((response) => {
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
};

  return (
    <>
    <Navbar />
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
                    <div className="h3 fw-light">Add Book</div>
                    <p className="mb-4 text-muted">
                      You can add a book to your collection.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="title"
                        type="text"
                        placeholder="Title"
                        defaultValue={book.title}
                        onChange={(e) =>
                          setBook({ ...book, title: e.target.value })
                        }
                        onBlur={handleMessages}
                        required="required"
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
                        onChange={(e) =>
                          setBook({ ...book, author: e.target.value })
                        }
                        onBlur={handleMessages}
                        required="required"
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
                        onChange={(e) =>
                          setBook({ ...book, description: e.target.value })
                        }
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
                        onChange={(e) =>
                          setBook({ ...book, category: e.target.value })
                        }
                        onBlur={handleMessages}
                        required="required"
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
                        onChange={(e) =>
                          setBook({ ...book, publisher: e.target.value })
                        }
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
                        onChange={(e) =>
                          setBook({ ...book, release_year: e.target.value })
                        }
                        onBlur={handleMessages}
                        required="required"
                      />
                      <label htmlFor="release_year">Release Year</label>
                    </div>
                    <div className="text-success" >
                      <div className="text-center mb-3">
                        <div className="fw-bolder">{succesMessage}</div>
                      </div>
                    </div>

                    <div className="text-danger" >
                      <div className="text-center text-danger mb-3">
                        {errorMessage}
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-lg"
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
    </>
  );
}
