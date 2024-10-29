import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import '../App.css'

export default function Login() {
    const [formInput, setFormInput] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:5001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formInput),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to Login");
            }
            return response.json();
        })
        .then((data) => {
            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                navigate("/AdminControllers");
            } else {
                throw new Error("Token is missing");
                
            }
        })
        .catch((error) => {
            alert("you need to registry first");;
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

                <div>
                    <Checkbox id="check" />
                    <label htmlFor="check">Remember Me</label>
                </div>

                <button type="submit" className="loginBtn">Login</button>
            </form>
        </div>
    );
}
