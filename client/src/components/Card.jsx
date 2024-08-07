import { Link } from "react-router-dom";

export default function Card(props) {
 
    const { book, handleRemove } = props;   

  return (
    <div className="card h-100">
      <div className="card-body p-4">
        <div className="text-center">
          <h5 className="fw-bolder">{book.title}</h5>
          <strong>{book.author}</strong><br />
          <em>{book.category}</em><br />
          <span className="text-muted">{book.publisher}</span><br />
          <span className="fw-semibold">{book.release_year}</span>
          <p className="text-break">{book.description}</p>
        </div>
      </div>

      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div className="text-center">
          <button className="btn btn-outline-danger mt-auto me-5" onClick={()=> handleRemove(book.book_id)} >
            Remove
          </button>
          <Link className="btn btn-outline-success mt-auto" to={`/collection/update/${book.book_id}`}>
            Update
          </Link>
        </div>
      </div>
    </div>
  );
}
