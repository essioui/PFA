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

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? { ...order, status: "In Progress" } : order
                    )
                );
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error updating status. Please try again.");
        }
    };

    const updateOrderStatusToInCancel = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/orders/cancel/${id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify({ adminMessage: cancelMessage }),
            });

            if (response.ok) {
                const updateOrder = await response.json();
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? updateOrder.order : order
                    )
                );
                alert(updateOrder.message);
            } else {
                alert("Failed to cancel order");
            }
        } catch (error) {
            alert("Error updating order status. Please try again.");
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
                method: "DELETE",
                headers,
            });

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order._id !== id)
                );
                alert("Order deleted successfully.");
            } else {
                alert("Failed to delete order.");
            }
        } catch (error) {
            alert("Error deleting order. Please try again.");
        }
    };

    return (
        <div className="orders-container">
            {orders.map((order) => (
                <div key={order._id} className="order-card">
                    <h4>Table Number: {order.tableNumber}</h4>
                    <div>
                        <h5>Foods:</h5>
                        {order.foods.map((food) => (
                            <p key={food._id}>{food.name}, Quantity: {food.quantity}</p>
                        ))}
                    </div>
                    <div>
                        <h5>Drinks:</h5>
                        {order.drinks.map((drink) => (
                            <p key={drink._id}>{drink.name}, Quantity: {drink.quantity}</p>
                        ))}
                    </div>
                    <p>Status: <b>{order.status}</b></p>
                    <p>Total Price: {order.totalPrice.toFixed(2)}</p>
                    <button className="order-btn progress-btn" onClick={() => updateOrderStatusToInProgress(order._id)}>Set in Progress</button>
                    <button className="order-btn cancel-btn" onClick={() => updateOrderStatusToInCancel(order._id)}>Set Cancel</button>
                    <button className="order-btn delete-btn" onClick={() => deleteOrder(order._id)}>Delete Order</button>
                </div>
            ))}
            <div className="cancel-message-container">
                <label>Cancel Message:</label>
                <input
                    className="cancel-input"
                    type="text"
                    value={cancelMessage}
                    onChange={(e) => setCancelMessage(e.target.value)}
                    placeholder="Enter Cancellation message"
                />
            </div>
        </div>
    );
}
