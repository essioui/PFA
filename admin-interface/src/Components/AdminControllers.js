import { Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import MyForm from './MyForm';
import ModifieProducts from './ModifieProducts';

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
        <div style={{ marginBottom: '20px' }}>
            <button onClick={() => navigate('/AdminControllers/Products')}>Orders</button>
            <button onClick={() => navigate('/AdminControllers/MyForm')}>Create New Products</button>
            <button onClick={() => navigate('/AdminControllers/ModifieProducts')}>Modify Products</button>
        </div>
    );
}
