import React, { Component } from 'react'
import { Link } from '@/router-link'
import { store } from '@/store.js'
 
class Home extends Component {
  render() {
    return (
      <Link to="/login">Log in</Link> to get started!
    )
  }
}
 
export default Home