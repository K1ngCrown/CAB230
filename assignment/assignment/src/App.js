import React, { Component } from 'react'
import { Router } from '@/router-link'
import Navigation from '@/components/Navigation.js'
import routes from './routes.js'
import './App.css'
import { Link } from '@/router-link'
import { store } from '@/store.js'
import { router } from 'router-link'
import navigation from './navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navigation/>
        </header>
        <main className="App-main">
          <Router routes={ routes }/>
        </main>
      </div>
    )
  }
}
 
export default App



 
class Home extends Component {
  render() {
    return (
      <Link to="/login">Log in</Link>
    )
  }
}
 





 
// Do this anywhere inside your component to redirect
router.push('/login')


 
// Use like this




















































/*

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Home from './App';
import stocks from './stocks';





const Dashboard = () => (
  <div>
    <h2>Home</h2>
    
  </div>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    
  </div>
)


const app = () => (
  <div>
    <h2>Home</h2>
    <Router>
      <Link to = {`/`}>Home</Link>
      <Link to = {`/`}>Stocks</Link>
      <main>
          <Route exact path ="/" component ={Home} />
          <Route path ="/stocks" component = {stocks}/>
      </main>
    </Router>
  </div>
)





export default Home;

*/