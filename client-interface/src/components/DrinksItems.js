import { useState, useEffect } from 'react';
import '../App.css';

export default function DrinksItems({ addToOrder }) {
    const [drinks, setDrinks] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchDrinks = async () => {
            const res = await fetch('http://localhost:5001/api/drinks');
            const data = await res.json();
            setDrinks(data);
        };
        fetchDrinks();
    }, []);

    const handleQuantityChange = (id, value) => {
        const quantity = Math.max(1, Number(value));
        setQuantities((prev) => ({
            ...prev,
            [id]: quantity,
        }));
    };

    const handleAddToOrder = (drink) => {
        const quantity = quantities[drink._id] || 1;
        const newOrderItem = { 
            name: drink.name, 
            quantity, 
            price: drink.price, 
            category: drink.category
        };
        addToOrder(newOrderItem);
    };

    return (
        <div>
            
            {drinks.map((drink) => (
                <div key={drink._id} className="drink-item">

                    <div className="drink-image">
                        <img
                            alt="drink"
                            src={drink.imageUrl}
                            style={{width: "200px", height: '200px'}}
                        />
                    </div>

                    <div className="drink-details">
                        <h3>{drink.name}</h3>
                        <p>Price: {drink.price} TND</p>
                        <p>Category: {drink.category}</p>
                        {drink.description && <p>Description: {drink.description}</p>}

                        <input
                        className="quantity-input"
                            type="number"
                            min="1"
                            placeholder="Quantity"
                            defaultValue={1}
                            onChange={(e) => handleQuantityChange(drink._id, e.target.value)}
                        />
                        <button className="itemBtn" onClick={() => handleAddToOrder(drink)}>Add to Order</button>
                    </div>

                </div>
            ))}
        </div>
    );
}
