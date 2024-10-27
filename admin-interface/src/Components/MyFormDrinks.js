import React, { useState } from "react";

export default function MyForm() {
    const [formInputs, setFormInputs] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
    });

    const token = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5001/api/drinks', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(formInputs),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success', data);
            setFormInputs({
                name: "",
                price: "",
                category: "",
                description: "",
            });
        })
        .catch((error) => {
            console.log('Error', error);
        });
    };

    return(
        <div className="outStyle">

            <h2>Create New Drink</h2>
            
            <form className="fromStyle"
            onSubmit={handleSubmit}
            >

            
                <label className="active">Name: </label>
                <input className="active"
                type="text"
                name="name"
                placeholder="Enter product name"
                required
                value={formInputs.name || ""}
                onChange={(event) => {
                    setFormInputs({...formInputs, name: event.target.value});
                }}
                />

                <label className="active">Price: </label>
                <input className="active"
                type="number"
                name="price"
                placeholder="Enter product price"
                required
                value={formInputs.price || ""}
                onChange={(event) => {
                    setFormInputs({...formInputs, price: event.target.value > 0 
                        ? event.target.value : ""});
                }}
                />

                <label className="active">Category: </label>
                <input className="active"
                type="text"
                name="category"
                placeholder="Enter product category"
                required
                value={formInputs.category || ""}
                onChange={(event) => {
                    setFormInputs({...formInputs, category: event.target.value});
                }}
                />

                <label className="active">Description: </label>
                <input className="active"
                type="text"
                value={formInputs.description || ""}
                onChange={(event) => {
                    setFormInputs({...formInputs, description: event.target.value});
                }}
                />

                <button className="active click">Submit</button>
            </form>
        </div>
    );
}