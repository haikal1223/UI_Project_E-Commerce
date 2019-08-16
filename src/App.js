import React from 'react'
import Navbar from './component/pages/header'
import {Route} from 'react-router-dom'
import Jumbotron from './component/pages/jumbotron'
import Register from './component/pages/register'

class App extends React.Component{


  render(){

    return(
      <div>
        <Navbar/>
          <Route exact path='/' component={Jumbotron} />
          <Route path='/register' component={Register} />
      </div>
    )
  }
}




export default App