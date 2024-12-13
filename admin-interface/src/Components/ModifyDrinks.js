import React, { useState, useEffect } from "react";
import '../App.css';

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

        <div className="display">

            <div style={{textAlign: 'center'}}>
                {drinks.map((drink) => (
                    <div key={drink._id} style={{display: 'flex', flexDirection: 'row', borderBottom: '2px solid black', marginTop: '25px'}}>

                        <div style={{width: '50%', margin: 'auto'}}>
                            <img
                            alt="drink"
                            src={drink.imageUrl}
                            style={{width: "200px", height: '200px'}}
                            />
                        </div>

                        <div style={{width: '50%', margin: 'auto'}}>
                            <h3>{drink.name}</h3>
                            <p>Price: {drink.price}</p>
                            <p>Category: {drink.category}</p>
                            <p>Description: {drink.description}</p>
                            <button className="click" onClick={() => handleEditClick(drink)}>Edit</button>
                            <button className="click" onClick={() => deleteDrink(drink._id)}>Delete</button>
                        </div>

                    </div>
                ))}
            </div>

            <div>
                {editingDrink && (

                    <div className="outStyle">
                        <h2>Edit Drink</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                saveDrink();
                            }}
                        >
                            <div>
                                <div>
                                    <label>Name</label>
                                </div>

                                <input className="put"
                                type="text"
                                name="name"
                                value={editingDrink.name || ""}
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
                                value={editingDrink.price || ""}
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
                                value={editingDrink.category || ""}
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
                                value={editingDrink.description || ""}
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
                                value={editingDrink.imageUrl || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            
                        

                            <button className="click" type="submit">Save</button> <br></br>
                            <button className="click" onClick={() => setEditingDrink(null)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
}
