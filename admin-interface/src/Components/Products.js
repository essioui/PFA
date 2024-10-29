import { useEffect, useState } from "react";
import '../App.css';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [cancelMessage, setCancelMessage] = useState("");
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

    const updateOrderStatusToInProgress = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/orders/progress/${id}`, {
                method: "PATCH",
                headers,
            });
            const data = await response.json();

            if(response.ok) {
                setOrders((prevOrders) => 
                prevOrders.map((order) =>
                    order._id === id ? { ...order, status: "In Progress" } : order
                )
            );
            alert(data.message);
            } else {
                console.error("Failed to update status.", data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error("Error", error);
            alert("Error updating status. Please try again.");
        }
    };

    const updateOrderStatusToInCancel = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/orders/cancel/${id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify({message: cancelMessage}),
            });

            if(response.ok) {
                const updateOrder = await response.json();
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? updateOrder.order : order
                    )
                );
                alert(updateOrder.message);
            } else {
                console.error("Failed to cancel order");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div style={{width: '70%', margin: '20px 20px'}}>
            {orders.map((order) => (
                <div key={order._id} className="products">
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
                    <p>Status: <b>{order.status}</b></p>
                    <p>Total Price: {order.totalPrice.toFixed(2)}</p>
                    <button className="productBtn" onClick={() => updateOrderStatusToInProgress(order._id)}
                    >
                        Set in Progress
                    </button> <br></br>
                    <button className="productBtn" onClick={() => updateOrderStatusToInCancel(order._id)}
                    >
                        Set Cancel
                    </button>
                </div>
            ))}

            <div>
                <label>Cancel Message</label>
                <input
                className="inPro"
                type="text"
                value={cancelMessage}
                onChange={(e) => setCancelMessage(e.target.value)}
                placeholder="Enter Cancellation message"
                />
            </div>
        </div>
    );
}
