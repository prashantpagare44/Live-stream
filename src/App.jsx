import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx';
import Register from './component/register.jsx'
import Forgetpass from './component/Forgetpass.jsx'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/forget" element={<Forgetpass></Forgetpass>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
