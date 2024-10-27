import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                navigate("/AdminControllers"); // التوجيه إلى صفحة AdminControllers
            } else {
                throw new Error("Token is missing");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User Name:
                    <input
                        type="text"
                        name="username"
                        placeholder="Please Enter your Name"
                        value={formInput.username}
                        onChange={(event) => setFormInput({...formInput, username: event.target.value})}
                    />
                </label>

                <br />

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Please Enter your Password"
                        value={formInput.password}
                        onChange={(event) => setFormInput({...formInput, password: event.target.value})}
                    />
                </label>

                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
