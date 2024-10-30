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
                    <div key={food._id} style={{display: 'flex', flexDirection: 'row', borderBottom: '2px solid black', marginTop: '25px'}}>

                        <div style={{width: '50%', margin: 'auto'}}>
                            <img
                            alt="food"
                            src={food.imageUrl}
                            style={{width: "200px", height: '200px'}}
                            />
                        </div>

                        <div style={{width: '50%', margin: 'auto'}}>
                            <h3>{food.name}</h3>
                            <p>Price: {food.price}</p>
                            <p>Category: {food.category}</p>
                            <p>Description: {food.description}</p>
                            <button className="click" onClick={() => handleEditClick(food)}>Edit</button>
                            <button className="click" onClick={() => deleteFood(food._id)}>Delete</button>
                        </div>

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

                            <div>
                                <div>
                                    <label>Image Url</label>
                                </div>
                                <input className="put"
                                type="text"
                                name="imageUrl"
                                value={editingFood.imageUrl || ""}
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
