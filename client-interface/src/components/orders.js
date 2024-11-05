import { useState } from 'react';
import FoodsItems from './FoodsItems';
import DrinksItems from './DrinksItems';
import OrderSummary from './OrderSummary';
import Header from './Header'
import '../App.css';
import Footer from './Footer';

export default function Orders() {
    const [showFoods, setShowFoods] = useState(true);
    const [orderItems, setOrderItems] = useState([]);

    
    const addToOrder = (item) => {
        setOrderItems((prev) => [...prev, item]);
    };

    return (
        <div className='main-container'>
            <Header />
            
            <div>
                <button className='btn' onClick={() => setShowFoods(true)}>List of Foods</button>
                <button className='btn' onClick={() => setShowFoods(false)}>List of Drinks</button>
            </div>


            {showFoods ? <FoodsItems addToOrder={addToOrder} /> : <DrinksItems addToOrder={addToOrder} />}


            <OrderSummary orderItems={orderItems} />
            
            <Footer />
        </div>
    );
}
