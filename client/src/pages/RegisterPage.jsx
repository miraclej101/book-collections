export default function RegisterPage() {
  return (
   
      <div className="row justify-content-center position-absolute top-50 start-50 translate-middle w-75">
        <div className="col-lg-8">
          <div className="card border-0 rounded-3 shadow-lg">
            <div className="card-body p-4">
              <div className="text-center">
                <div className="h1 fw-light">Register Form</div>
                <p className="mb-4 text-muted">
                    Register to be a member of this page
                </p>
              </div>

              <form id="contactForm">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="firstname"
                    type="text"
                    placeholder="First name"
                    required="required"
                    aria-describedby="firstnameValidation"
                  />
                  <label for="firstname">First name</label>
                  <div
                    id="firstnameValidation"
                    className="invalid-feedback"
                  >
                    First name is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                    required="required"
                    aria-describedby="lastnameValidation"
                  />
                  <label for="lastname">Last name</label>
                  <div
                  id="lastnameValidation"
                    className="invalid-feedback"
                  >
                    Last name is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="username"
                    type="text"
                    placeholder="Username"
                    required="required"
                    aria-describedby="usernameValidation"
                  />
                  <label for="username">Username</label>
                  <div
                  id="usernameValidation"
                    className="invalid-feedback"
                  >
                    Username is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required="required"
                    aria-describedby="passwordValidation"
                  />
                  <label for="password">Password</label>
                  <div
                  id="passwordValidation"
                    className="invalid-feedback"
                  >
                    Password is required.
                  </div>
                </div>
                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">Form submission successful!</div>
                  </div>
                </div>
                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3">
                    Error Register!
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
    
  );
}
