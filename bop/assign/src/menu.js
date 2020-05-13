import React from 'react';
import { Link } from 'react-router-dom';

let checkAuthentication;

//if (div.Authorization === 'Bearer null'){ checkAuthentication =false;}
//else {checkAuthentication =true;}
function Menu() {
    return (
        
        <header id="nav">
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