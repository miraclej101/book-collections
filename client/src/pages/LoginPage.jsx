export default function LoginPage() {
    const style = {
        height: '100vh'
    }
  return (
    <div className="container mt-5" style={style}>
      <div className="row position-absolute top-50 start-50 translate-middle w-75">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <htmlForm>
                <div className="htmlForm-floating mb-3">
                  <input
                    type="text"
                    className="htmlForm-control"
                    id="floatingInput"
                    placeholder="Username"
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="htmlForm-floating mb-3">
                  <input
                    type="password"
                    className="htmlForm-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>               
              </htmlForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
