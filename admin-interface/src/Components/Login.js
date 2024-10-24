import React from "react";

export default function Login() {
    return(
        <div>
            <h2>Login</h2>

            <form>

                <label>
                    User Name:
                    <input type="text" name="username"></input>
                </label>

                <br />

                <label>
                    Password:
                    <input type="password" name="password"></input>
                </label>

                <br />

                <button type="submit">Login</button>
            </form>
            
        </div>
    );
}