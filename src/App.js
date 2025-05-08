import './App.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { error } from 'jquery';
import { useEffect } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard></Dashboard>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};
export default App;




