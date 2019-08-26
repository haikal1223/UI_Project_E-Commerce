import React from 'react'
import Navbar from './pages/header'
import { Route } from 'react-router-dom'
import Homepage from './pages/home'

class App extends React.Component{


  render(){

    return(
      <div>
        <Navbar/>
          <Route exact path='/' component={Homepage} />
        
      </div>
    )
  }
}




export default App