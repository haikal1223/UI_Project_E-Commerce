import React from 'react'
import Navbar from './pages/header'
import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/home'
import Login from './pages/login'
import Showcase from './pages/showselected'
import AdminMainPages from './pages/Admin/AdminAddProduct'
import './App.css'

class App extends React.Component{


  render(){

    return(
      <div>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/showcase' component={Showcase} />
          <Route path='/admin' component={AdminMainPages} />
        </Switch>
        
      </div>
    )
  }
}




export default App