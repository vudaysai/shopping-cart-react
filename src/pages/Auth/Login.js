import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory, Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import "./Login.css";

const URL = "http://localhost:5000/api/auth/login";

export default function Login () {
	const [email, setEmail] = useState("");
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
				"email": email, "password": password
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				localStorage.setItem('token', responseJson.token)
				localStorage.setItem('isAdmin', responseJson.isAdmin)
				history.go(0)
			})
			.catch((error) => {
				console.error(error);
			});

	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
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
				<Link to='/register' >Register</Link>
				<Button block type="submit" disabled={!validateForm()}>
					Login
        </Button>
			</Form>
		</div>
	);
}
