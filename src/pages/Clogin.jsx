import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "/src/UserAuthContext";

const Clogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/shop");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/shop");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="p-4 box"
          style={{
            maxWidth: "400px",
            width: "100%",
            border: "2px solid lightblue",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "50vh",
            transform: "translateY(-50%)",
          }}
        >
          <h2 className="mb-3">Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
             <button type="submit" class="bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300 ">Login</button>
            </div>
          </Form>
          <hr />
          <div>
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
        </div>
      </div>
      <div
        className="p-4 box mt-3 text-center"
        style={{
          maxWidth: "400px",
          margin: "20px auto",
          border: "2px solid lightblue",
          borderRadius: "10px",
        }}
      >
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </>
  );
};

export default Clogin;
