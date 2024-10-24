import { useState } from 'react';
import TableNumberInput from './TableNumberInput';
import DataMenu from './DataMenu';

export default function OrderSummary({ orderItems }) {
    const [foods, setFoods] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    const sendOrderToDatabase = async () => {
    try {
        
        const tableNum = Math.max(1, parseFloat(tableNumber));
        if(isNaN(tableNum) && tableNum <= 0) {
            alert("Please verifie your number table");
        }

        
        if (!tableNum || isNaN(tableNum)) {
            alert('Please provide a valid table number.');
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

        setOrderStatus('Order sent successfully');
        console.log('Order sent successfully');
    } catch (error) {
        console.error('Error sending order:', error);
        setOrderStatus("Please dont repeat products you can choose quantity");
    }
};

    return (
        <div>
            <DataMenu setFoods={setFoods} setDrinks={setDrinks} />

            <TableNumberInput
                tableNumber={tableNumber}
                onTableNumberChange={setTableNumber}
            />

            <h2>Order Summary</h2>
            {orderItems.length === 0 ? (
                <p>No items added yet.</p>
            ) : (
                <>
                    <div>
                        {orderItems.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px', backgroundColor: '#167f9c' }}>
                                <p>
                                    {item.name} - Quantity: {item.quantity} - Total Price: {(item.quantity * item.price).toFixed(2)} TND
                                </p>
                            </div>
                        ))}
                    </div>
                    <div style={{backgroundColor: '#006994', color: 'orange'}}>
                        Total: {orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)} TND
                    </div>
                    <button style={{backgroundColor: 'orange', width: '50%', marginTop: '40px', marginBottom: '40px' ,margin: 'auto', padding: '15px 0px'}} onClick={sendOrderToDatabase}>Send Order</button>
                    <div style={{width: '75%', margin: 'auto', backgroundColor: 'blue'}}>{orderStatus && <p>{orderStatus}</p>}</div>
                </>
            )}
        </div>
    );
}
