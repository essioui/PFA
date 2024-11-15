import React from "react";
import '../App.css';

export default function Header() {
    return(
        <div style={{
            width: "100%",
            backgroundColor: "#ffd700",
            padding: "15px 0px",
            textAlign: "center",
            color: "white"
        }}>
            <h1 className="headerTitle">Welcome to <span className="highlight">Desert</span> Restaurant</h1>
        </div>
    );
}
