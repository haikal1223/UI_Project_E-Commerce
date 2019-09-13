import React from 'react'
import Navbar from './pages/header'
import { Route, Switch,  } from 'react-router-dom'
import Homepage from './pages/home'
import Login from './pages/login'
import Showcase from './pages/showselected'
import AdminMainPages from './pages/Admin/AdminAddProduct'
import Register from './pages/register'
import TestCard from './component/testCardAgain'
import WaitingVerification from './pages/waitingVerification'
import Verified from './pages/Verified'
import AdminAddBrand from './pages/Admin/AdminAddBrand'
import AdminAddCategory from './pages/Admin/AdminAddCategory'
import TestProdCard from './component/testCard'
import AdminAddJumbo from './pages/Admin/AdminAddJumbotron'
import { connect } from 'react-redux'
import './App.css'
import {keepLogin} from './Action'

class App extends React.Component{
componentDidMount(){
  this.props.keepLogin()
  console.log(this.props.keepLogin())
}

  render(){
    return(
      <div>

        <Navbar/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/showcase' component={Showcase} />
          <Route path='/admin' component={AdminMainPages} />
          <Route path='/register' component={Register} />
          <Route path='/test' component={TestCard} />
          <Route path='/waitingverification' component={WaitingVerification} />
          <Route path='/verified' component={Verified} />
          <Route path='/adminaddbrand' component={AdminAddBrand} />
          <Route path='/adminaddcategory' component={AdminAddCategory} />
          <Route path='/testcardprod' component={TestProdCard} />
          <Route path='/adminaddjumbotron' component={AdminAddJumbo} />
        </Switch>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      searchBoxTrue : state.searchbox.status,
      searchText: state.searchbox.searchtext
  }
}


export default connect(mapStateToProps,{keepLogin})(App)