import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("accessToken");

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        fetchOrders();
    }, );

    const fetchOrders = async () => {
        const response = await fetch('http://localhost:5001/api/orders', { headers });
        const data = await response.json();
        setOrders(data);
    };

    return (
        <div>
            <h2>Lists of Orders</h2>
            {orders.map((order) => (
                <div key={order._id} style={{border: '2px solid black'}}>
                    <h4>Table Number: {order.tableNumber}</h4>
                    <div>
                        <h4>Foods:</h4>
                        <div>
                            {order.foods.map((food) => (
                                <p key={food._id}>
                                    {food.name}, Quantity: {food.quantity}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4>Drinks:</h4>
                        <div>
                            {order.drinks.map((drink) => (
                                <p key={drink._id}>
                                    {drink.name}, Quantity: {drink.quantity}
                                </p>
                            ))}
                        </div>
                    </div>
                    <p>Total Price: {order.totalPrice}</p>
                    <p>Status: {order.status}</p>
                </div>
            ))}
        </div>
    );
}
