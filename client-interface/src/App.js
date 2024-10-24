import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Orders from './components/orders';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Orders' element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
