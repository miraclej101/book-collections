import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function LoginPage() {
    const style = {
        height: '100vh'
    };
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Function `login` ใน AuthContext มา Execute ใน Event Handler ของ Form
        const res = await login({
                username,
                password
            })

        if(typeof(res) !== undefined && res.response) {
         //   console.log("res :", res)
            setErrorMessage(res.response.data.message);
        } else {
            console.log("res success :", res.data.message)
            navigate("/"); 
        }
       
    };
   
  return (
    <div className="container mt-5" style={style}>
      <Navbar />
      <div className="row position-absolute top-50 start-50 translate-middle w-75">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form onSubmit={handleSubmit}>
                <div className="text-danger mb-3">
                    {errorMessage}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => setErrorMessage("")}
                    required="required"
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setErrorMessage("")}
                    required="required"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
