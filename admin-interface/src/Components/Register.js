import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formInput, setFormInput] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5001/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formInput),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            setFormInput({
                username: "",
                password: "",
            });
            alert("Account created successfully");

            navigate("/login");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error creating account, try again.");
        });
    };

    return (
        <div>
            <h2>Create a new account</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        required
                        value={formInput.username}
                        onChange={(event) => {
                            setFormInput({...formInput, username: event.target.value});
                        }}
                    />
                </label>

                <br />

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={formInput.password}
                        onChange={(event) => {
                            setFormInput({...formInput, password: event.target.value});
                        }}
                    />
                </label>

                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
