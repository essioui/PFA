import React, { useState, useEffect } from "react";
import '../App.css';

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
        <div className="display">
            
            <div style={{textAlign: 'center'}}>
                {foods.map((food) => (
                    <div key={food._id}>
                        <h3>{food.name}</h3>
                        <p>Price: {food.price}</p>
                        <p>Category: {food.category}</p>
                        <p>Description: {food.description}</p>
                        <button onClick={() => handleEditClick(food)}>Edit</button>
                        <button onClick={() => deleteFood(food._id)}>Delete</button>
                        <hr style={{border: '1px solid black'}}></hr>
                    </div>
                ))}
            </div>

            <div>
                {editingFood && (

                    <div className="outStyle">
                        <h3>Edit Food</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                saveFood();
                            }}
                        >
                            <div>
                                <div>
                                    <label>Name</label>
                                </div>

                                <input className="put"
                                type="text"
                                name="name"
                                value={editingFood.name || ""}
                                onChange={handleInputChange}
                                required
                                />
                            </div>
                            
                            <div>
                                <div>
                                    <label>Price</label>
                                </div>

                                <input className="put"
                                type="number"
                                name="price"
                                value={editingFood.price || ""}
                                onChange={handleInputChange}
                                required
                                />

                            </div>
                            
                            <div>
                                <div>
                                    <label>Category</label>
                                </div>

                                <input className="put"
                                type="text"
                                name="category"
                                value={editingFood.category || ""}
                                onChange={handleInputChange}
                                required
                                />
                            </div>
                            
                            <div>
                                <div>
                                    <label>Description</label>
                                </div>

                                <input className="put"
                                type="text"
                                name="description"
                                value={editingFood.description || ""}
                                onChange={handleInputChange}
                                />

                            </div>
                            
                            

                            <button className="click" type="submit">Save</button> <br></br>
                            <button className="click" onClick={() => setEditingFood(null)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
}
