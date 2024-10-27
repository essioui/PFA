import React, { useState, useEffect } from "react";

export default function DrinksList() {
    const [drinks, setDrinks] = useState([]);
    const [editingDrink, setEditingDrink] = useState(null);
    const token = localStorage.getItem("accessToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    useEffect(() => {
        fetchDrinks();
    }, );

    const fetchDrinks = async () => {
        const response = await fetch("http://localhost:5001/api/drinks", { headers });
        const data = await response.json();
        setDrinks(data);
    };

    
    const deleteDrink = async (id) => {
        await fetch(`http://localhost:5001/api/drinks/${id}`, {
            method: "DELETE",
            headers,
        });
        fetchDrinks();
    };

    
    const handleEditClick = (drink) => {
        setEditingDrink(drink);
    };

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditingDrink({ ...editingDrink, [name]: value });
    };

    
    const saveDrink = async () => {
        await fetch(`http://localhost:5001/api/drinks/${editingDrink._id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(editingDrink),
        });
        setEditingDrink(null);
        fetchDrinks();
    };

    return (
        <div>
            <h2>Modify Drink</h2>
            {drinks.map((drink) => (
                <div key={drink._id}>
                    <h3>{drink.name}</h3>
                    <p>Price: {drink.price}</p>
                    <p>Category: {drink.category}</p>
                    <p>Description: {drink.description}</p>
                    <button onClick={() => handleEditClick(drink)}>Edit</button>
                    <button onClick={() => deleteDrink(drink._id)}>Delete</button>
                </div>
            ))}

            {editingDrink && (
                <div>
                    <h3>Edit Food Item</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            saveDrink();
                        }}
                    >
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editingDrink.name || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={editingDrink.price || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={editingDrink.category || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={editingDrink.description || ""}
                            onChange={handleInputChange}
                        />

                        <button type="submit">Save</button>
                        <button onClick={() => setEditingDrink(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}
