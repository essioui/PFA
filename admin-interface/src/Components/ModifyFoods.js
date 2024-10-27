import React, { useState, useEffect } from "react";

export default function FoodList() {
    const [foods, setFoods] = useState([]);
    const [editingFood, setEditingFood] = useState(null);
    const token = localStorage.getItem("accessToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    useEffect(() => {
        fetchFoods();
    }, );

    const fetchFoods = async () => {
        const response = await fetch("http://localhost:5001/api/foods", { headers });
        const data = await response.json();
        setFoods(data);
    };

    
    const deleteFood = async (id) => {
        await fetch(`http://localhost:5001/api/foods/${id}`, {
            method: "DELETE",
            headers,
        });
        fetchFoods();
    };

    
    const handleEditClick = (food) => {
        setEditingFood(food);
    };

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditingFood({ ...editingFood, [name]: value });
    };

    
    const saveFood = async () => {
        await fetch(`http://localhost:5001/api/foods/${editingFood._id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(editingFood),
        });
        setEditingFood(null);
        fetchFoods();
    };

    return (
        <div>
            <h2>Modify Food</h2>
            {foods.map((food) => (
                <div key={food._id}>
                    <h3>{food.name}</h3>
                    <p>Price: {food.price}</p>
                    <p>Category: {food.category}</p>
                    <p>Description: {food.description}</p>
                    <button onClick={() => handleEditClick(food)}>Edit</button>
                    <button onClick={() => deleteFood(food._id)}>Delete</button>
                </div>
            ))}

            {editingFood && (
                <div>
                    <h3>Edit Food Item</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            saveFood();
                        }}
                    >
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editingFood.name || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={editingFood.price || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={editingFood.category || ""}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={editingFood.description || ""}
                            onChange={handleInputChange}
                        />

                        <button type="submit">Save</button>
                        <button onClick={() => setEditingFood(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}
