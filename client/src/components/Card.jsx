export default function Card(props) {

    const { book } = props;

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
          <a className="btn btn-outline-danger mt-auto me-5" href="#">
            Delete
          </a>
          <a className="btn btn-outline-success mt-auto" href="#">
            Modify
          </a>
        </div>
      </div>
    </div>
  );
}
