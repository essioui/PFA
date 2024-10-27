import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import AdminControllers from './Components/AdminControllers';

function App() {
  return (
    <Router>
      <Header />
      
      <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/AdminControllers/*' element={<AdminControllers />} />
          </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
