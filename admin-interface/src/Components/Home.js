import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
    return(
        <div style={{height: "63vh", width: "80%", margin: "auto", textAlign: "center"}}>

            <h2>Log in or create a new accoun</h2>

            <div style={{marginTop: "150px"}}>
                <Link to="/Login">
                    <button className="login">Login</button>
                </Link>

                <Link to="/register">
                    <button className="login">Sign Up</button>
                </Link>
            </div>

            <div></div>

        </div>
    );
}