import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <header>
       
        
         <Link to = '/'>Home</Link>
        <Link to = '/stocks'>Stocks</Link>
        <Link to = '/quote'>Quote</Link>
        <Link to = '/price'>Price History (restricted)</Link>
        
        <Link to = '/register'>Register</Link>
        <Link to = '/login'>Login</Link>
        </header>
        
    );
}

export default Menu;