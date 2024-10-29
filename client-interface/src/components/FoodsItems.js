import { useState, useEffect } from 'react';

export default function FoodsItems({ addToOrder }) {
    const [foods, setFoods] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchFoods = async () => {
            const res = await fetch('http://localhost:5001/api/foods');
            const data = await res.json();
            setFoods(data);
        };
        fetchFoods();
    }, []);

    const handleQuantityChange = (id, value) => {
        const quantity = Math.max(1, Number(value));
        setQuantities((prev) => ({
            ...prev,
            [id]: quantity,
        }));
    };

    const handleAddToOrder = (food) => {
        const quantity = quantities[food._id] || 1;
        const newOrderItem = { 
            name: food.name, 
            quantity, 
            price: food.price, 
            category: food.category
        };
        addToOrder(newOrderItem);
    };

    return (
        <div>
            <h2>Foods List</h2>
            {foods.map((food) => (
                <div key={food._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>{food.name}</h3>
                    <p>Price: {food.price} TND</p>
                    <p>Category: {food.category}</p>
                    {food.description && <p>Description: {food.description}</p>}

                    <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        defaultValue={1}
                        onChange={(e) => handleQuantityChange(food._id, e.target.value)}
                    />
                    <button onClick={() => handleAddToOrder(food)}>Add to Order</button>
                </div>
            ))}
        </div>
    );
}