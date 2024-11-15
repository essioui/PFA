import { useState, useEffect } from 'react';
import TableNumberInput from './TableNumberInput';
import DataMenu from './DataMenu';
import Modal from './Modal';
import '../App.css';

export default function OrderSummary({ orderItems }) {
    const [foods, setFoods] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const sendOrderToDatabase = async () => {
        try {
            const tableNum = Math.max(1, parseFloat(tableNumber));
            if (isNaN(tableNum) || tableNum <= 0) {
                alert("Please verify your table number");
                return;
            }

            if (foods.length === 0 && drinks.length === 0) {
                alert('Some foods or drinks were not found in the menu. Please check your order.');
                return;
            }

            const foodOrders = orderItems.filter(orderItem =>
                foods.some(food => food.name.trim().toLowerCase() === orderItem.name.trim().toLowerCase())
            ).map(item => ({
                name: item.name,
                quantity: item.quantity || 1
            }));

            const drinkOrders = orderItems.filter(orderItem =>
                drinks.some(drink => drink.name.trim().toLowerCase() === orderItem.name.trim().toLowerCase())
            ).map(item => ({
                name: item.name,
                quantity: item.quantity || 1
            }));

            if (foodOrders.length === 0 && drinkOrders.length === 0) {
                alert('Some foods or drinks were not found in the menu. Please check your order.');
                return;
            }

            const totalPrice = orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

            const orderData = {
                tableNumber: tableNum,
                foods: foodOrders,
                drinks: drinkOrders,
                totalPrice,
                status: 'pending',
                adminMessage: ''
            };

            const response = await fetch('http://localhost:5001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to send order: ${errorMessage}`);
            }

            const data = await response.json();
            setOrderId(data._id);

            setOrderStatus('Order sent successfully');
            console.log('Order sent successfully');
        } catch (error) {
            console.error('Error sending order:', error);
            setOrderStatus("Please don't repeat products. You can choose quantity.");
        }
    };

    
    useEffect(() => {
        if (!orderId) return;

        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/orders/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderStatus(data.status);
                } else {
                    console.error('Error fetching order status');
                }
            } catch (error) {
                console.error('Error fetching order status:', error);
            }
        }, 15000);

        return () => clearInterval(intervalId);
    }, [orderId]);

    return (
        <div style={{ marginTop: "20px" }}>
            <DataMenu setFoods={setFoods} setDrinks={setDrinks} />

            <h2>Order Summary</h2>
            {orderItems.length === 0 ? (
                <p>No products added.</p>
            ) : (
                <>
                    <button onClick={() => setIsModalOpen(true)} className='orderBtn'>
                        Show Order 
                    </button>
                </>
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h2>Order Summary</h2>

                    <TableNumberInput
                        tableNumber={tableNumber}
                        onTableNumberChange={setTableNumber}
                    />

                    {orderItems.map((item, index) => (
                        <div key={index} className='order-item'>
                            <p>
                                {item.name} - Quantity: {item.quantity} - Total Price: {(item.quantity * item.price).toFixed(2)} TND
                            </p>
                        </div>
                    ))}
                    <div className='total-price'>
                        <b>Total: </b>{orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)} TND
                    </div>
                    <button onClick={sendOrderToDatabase}>Send Order</button>

                    {orderStatus && <p >Status: {orderStatus}</p>}
                </Modal>
            )}
        </div>
    );
}
