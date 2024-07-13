import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
    });
    const [message, setMessage] = useState("");
    const [textType, setTextType] = useState("text-success");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/user/register", user).then((response) => {
            setMessage(response.data.message);
            setTextType("text-success");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        })
        .catch((error) => {
            setMessage(error.response.data.message);
            setTextType("text-danger");
        })
    };
        

  return (
    <>
      <Navbar />
      <div className="row justify-content-center position-absolute top-50 start-50 translate-middle w-75">
        <div className="col-lg-8">
          <div className="card border-0 rounded-3 shadow-lg">
            <div className="card-body p-4">
              <div className="text-center">
                <div className="h1 fw-light">Register htmlForm</div>
                <p className="mb-4 text-muted">
                    Register to be a member of this page
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="firstname"
                    type="text"
                    placeholder="First name"
                    required="required"
                    aria-describedby="firstnameValidation"
                    onChange={(e) => setUser({...user, firstname: e.target.value})}
                    onBlur={() => setMessage("")}
                  />
                  <label htmlFor="firstname">First name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                    required="required"
                    aria-describedby="lastnameValidation"
                    onChange={(e) => setUser({...user, lastname: e.target.value})}
                    onBlur={() => setMessage("")}
                  />
                  <label htmlFor="lastname">Last name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="username"
                    type="text"
                    placeholder="Username"
                    required="required"
                    aria-describedby="usernameValidation"
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    onBlur={() => setMessage("")}
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required="required"
                    aria-describedby="passwordValidation"
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    onBlur={() => setMessage("")}
                  />
                  <label htmlFor ="password">Password</label>                  
                </div>
                <div className={`${textType} mb-3 text-center`}>
                        {message}
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
    </>
  );
}
