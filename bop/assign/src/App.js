import React from 'react';

import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './home'
import Menu from './menu'
import Stock from './stock'
import Quote from './quote'
import Price from './price'
import Register from './register'
import login from './login'


function App() {
  return (
   <BrowserRouter>

    <Menu/>

    <Switch>
      <Route exact path ="/" component={Home}/>
      <Route exact path ="/stocks" component={Stock}/>
      <Route exact path ="/quote" component={Quote}/>
      <Route exact path ="/price" component={Price}/>
      <Route exact path ="/register" component={Register}/>
      <Route exact path ="/login" component={login}/>

    </Switch>
   </BrowserRouter>
  );
}

export default App;
