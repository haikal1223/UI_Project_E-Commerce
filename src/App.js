import React from 'react'
import Navbar from './pages/header'
import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/home'
import Login from './pages/login'
import './App.css'

class App extends React.Component{


  render(){

    return(
      <div>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/login' component={Login} />

        </Switch>
        
      </div>
    )
  }
}




export default App