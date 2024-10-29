import { Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import MyForm from './MyForm';
import ModifieProducts from './ModifieProducts';
import '../App.css'

export default function AdminControllers() {
    return (
        <div>
            <NavigationButtons />
            <div>
                <Routes>
                    <Route path="/Products" element={<Products />} />
                    <Route path="/MyForm" element={<MyForm />} />
                    <Route path="/ModifieProducts" element={<ModifieProducts />} />
                </Routes>
            </div>
        </div>
    );
}

function NavigationButtons() {
    const navigate = useNavigate();

    return (
        <div className='adminontrollers'>
            <button className='AdminBtn' onClick={() => navigate('/AdminControllers/Products')}>Lists of Orders</button>
            <button className='AdminBtn' onClick={() => navigate('/AdminControllers/MyForm')}>Create New Products</button>
            <button className='AdminBtn' onClick={() => navigate('/AdminControllers/ModifieProducts')}>Modify Products</button>
        </div>
    );
}
