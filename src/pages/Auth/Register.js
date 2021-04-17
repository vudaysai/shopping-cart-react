import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { store } from 'react-notifications-component';
import { useHistory, Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import "./Login.css";

const URL = process.env.REACT_APP_SERVER_URL + "api/auth/register";

export default function Login () {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()

  function validateForm () {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit (event) {
    event.preventDefault();

    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email, "password": password, name
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        store.addNotification({
          title: "Sign Up",
          message: "Signed up successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        history.push('/')
      })
      .catch((error) => {
        console.error(error);
      });

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Link to='/' >Login</Link>
        <Button block type="submit" disabled={!validateForm()}>
          Sign Up!
        </Button>
      </Form>
    </div>
  );
}
