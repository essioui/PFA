import { useState, useEffect } from 'react';

export default function FoodsItems({ addToOrder }) {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            const res = await fetch('http://localhost:5001/api/foods');
            const data = await res.json();
            setFoods(data);
        };
        fetchFoods();
    }, []);


  

    return (
        <div>
            <h2>Foods List</h2>
            {foods.map((food) => (
                <div key={food._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>{food.name}</h3>
                    <p>Price: {food.price} TND</p>
                    <p>Category: {food.category}</p>
                    {food.description && <p>Description: {food.description}</p>}

                </div>
            ))}
        </div>
    );
}
