import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Dashboard from './App';
import Home from './App';
import stocks from './stocks';

function Main(){
    return (
        <Router>
            <main>
                <Link to = {`/`}>Home</Link>
            </main>
            <div>
                <Route exact path ="/" component ={Home} />
                <Route path ="/stocks" component = {stocks}/> 
            </div>
        </Router>

    )

}