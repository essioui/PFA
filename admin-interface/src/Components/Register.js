import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css'

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
        <div style={{width: '30%', margin: 'auto'}}>
            
            <form onSubmit={handleSubmit} className="loginForm">

                <div>
                    <div>
                        <label htmlFor="username" value="User Name">User Name</label>
                    </div>
                
                    <input
                        className="loginInput"
                        type="text"
                        name="username"
                        placeholder="Please Enter your Name"
                        value={formInput.username}
                        required
                        onChange={(event) => setFormInput({...formInput, username: event.target.value})}
                    />
                
                </div>

                <br />

                <div>
                    <div>
                        <label htmlFor="password" value="password">Password</label>
                    </div>

                    <input
                        className="loginInput"
                        type="password"
                        name="password"
                        placeholder="Please Enter your Password"
                        value={formInput.password}
                        required
                        onChange={(event) => setFormInput({...formInput, password: event.target.value})}
                    />
                </div>

                <button type="submit" className="loginBtn">Register</button>
            </form>
        </div>
    );
}
