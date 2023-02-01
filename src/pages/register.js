import React, { useState } from "react";
import logoSm from "../assets/images/logo-sm.png";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      if (!result?.success) {
        alert("Invalid data provided");
      } else {
        navigate("/login");
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      <div className="accountbg"></div>
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center mt-0 m-b-15">
              <a href="index.html" className="logo logo-admin">
                <img src={logoSm} height="90" alt="logo" />
              </a>
            </h3>

            <div className="p-3">
              <form className="form-horizontal" onSubmit={registerUser}>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required=""
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* <div className="form-group row">
                                <div className="col-12">
                                    <input className="form-control" type="text" required="" placeholder="Username"/>
                                </div>
                            </div> */}

                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required=""
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-12">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label font-weight-normal"
                        for="customCheck1"
                      >
                        I accept{" "}
                        <a href="/#" className="text-muted">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      className="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </div>

                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-12 m-t-20 text-center">
                    <Link to="/login" className="text-muted" value="Already">
                      Already have account?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
