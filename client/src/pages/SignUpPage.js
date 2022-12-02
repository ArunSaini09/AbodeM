import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const signUp = (e) => {
    e.preventDefault();
    let { name, email, password } = data;
    auth
      .register(name, email, password)
      .then((user) => {
        // setRedirectToReferrer(true); // used in react-router v5
        // in react-router v6 navigate changes the pages directly.
        // comment from official docs example:
        //    Send them back to the page they tried to visit when they were
        //    redirected to the login page. Use { replace: true } so we don't create
        //    another entry in the history stack for the login page.  This means that
        //    when they get to the protected page and click the back button, they
        //    won't end up back on the login page, which is also really nice for the
        //    user experience.
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(true);
      });
  };

  let errorMessage = "";
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        Sign Up Failed
      </div>
    );
  }

  return (
    <section className="vh-100">
  <div className="px-4 py-5 px-md-5 text-center text-lg-start mt-5"  style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold ls-tight">
            The <span className = "text-primary">easy</span> solution 
            {/*<span class="text-primary">for your tracking needs</span>*/}
          </h1>
          <p style={{color: "hsl(217 10%, 50.8%)"}}>
            Get rid of the notebooks and notepads! Sign-up and create an account 
            now to easily manage, view, and record your homes expenses. 
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
                <div className="row">
                  <div>
                  <form onSubmit={signUp}>
                    <div className="form-row">
                      {errorMessage}
                      <input
                        type="text"
                        className="form-control w-100"
                        name="name"
                        placeholder="name"
                        value={data.name}
                        onChange={fieldChanged("name")}
                      />
                      <input
                        type="email"
                        className="form-control w-100"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={fieldChanged("email")}
                      />
                      <input
                        type="password"
                        className="form-control w-100 mb-3"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={fieldChanged("password")}
                      />
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign up
                      </button>
                    </form>
                    <div className="align-item-center">
                        Already have an account? <Link to="/login">Sign-in</Link>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>

</section>
  );
}

export default SignUpPage;

{/*
<div className="col-10 col-md-8 col-lg-7">
      <form onSubmit={signUp}>
        <div className="form-row">
          {errorMessage}
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="name"
            value={data.name}
            onChange={fieldChanged("name")}
          />
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={fieldChanged("email")}
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={fieldChanged("password")}
          />
          <button type="submit" className="btn btn-primary ml-auto">
            Sign Up
          </button>
        </div>
      </form>
    </div>





*/}