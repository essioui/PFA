import React, { useState } from "react";
import '../App.css';

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
            
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>Name</label>
                    </div>

                    <input className="put"
                    type="text"
                    name="name"
                    placeholder="Enter Drink name"
                    required
                    value={formInputs.name || ""}
                    onChange={(event) => {
                        setFormInputs({...formInputs, name: event.target.value});
                    }}
                    />

                </div>
                
                <div>
                    <div>
                        <label>Price</label>
                    </div>

                    <input className="put"
                    type="number"
                    name="price"
                    placeholder="Enter Drink price"
                    required
                    value={formInputs.price || ""}
                    onChange={(event) => {
                        setFormInputs({...formInputs, price: event.target.value > 0 
                            ? event.target.value : ""});
                    }}
                    />

                </div>
                
                <div>
                    <div>
                        <label>Category</label>
                    </div>

                    <input className="put"
                    type="text"
                    name="category"
                    placeholder="Enter Drink category"
                    required
                    value={formInputs.category || ""}
                    onChange={(event) => {
                        setFormInputs({...formInputs, category: event.target.value});
                    }}
                    />

                </div>

                
                <div>
                    <div>
                        <label>Description</label>
                    </div>

                    <input className="put"
                    type="text"
                    value={formInputs.description || ""}
                    onChange={(event) => {
                        setFormInputs({...formInputs, description: event.target.value});
                    }}
                    />

                </div>

                
                

                <button className="click">Submit</button>
            </form>
        </div>
    );
}