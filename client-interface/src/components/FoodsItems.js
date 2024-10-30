import { useState, useEffect } from 'react';
import '../App.css';

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
            
            {foods.map((food) => (
                <div key={food._id} style={{display: 'flex', flexDirection: 'row', borderBottom: '2px solid black', marginTop: '25px'}}>

                    <div style={{width: '50%', margin: 'auto'}}>
                        <img
                        alt='food'
                        src={food.imageUrl}
                        style={{width: "200px", height: '200px'}}
                    />
                    </div>

                    <div style={{width: '50%', margin: 'auto'}}>

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
                        <button className='itemBtn' onClick={() => handleAddToOrder(food)}>Add to Order</button>

                    </div>

                </div>
            ))}
        </div>
    );
}
