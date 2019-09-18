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
import ProductDetail from './pages/ProductDetail'
import CheckOut from './pages/Checkout'
import uploadPembayaran from './pages/UploadPembayaran'
import AdminOrderChecked from './pages/Admin/AdminOrderCheck'
import newArrivalProduct from './pages/newArrivalProduct'
import { connect } from 'react-redux'
import './App.css'
import {keepLogin, showCartUser} from './Action'

class App extends React.Component{
componentDidMount(){
  this.props.keepLogin()

    // this.props.showCartUser()

}

  render(){
    return(
      <div>

        <Navbar/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/showcase' component={Showcase} />
          <Route path='/productdetail' component={ProductDetail} />
          <Route path='/admin' component={AdminMainPages} />
          <Route path='/register' component={Register} />
          <Route path='/test' component={TestCard} />
          <Route path='/waitingverification' component={WaitingVerification} />
          <Route path='/verified' component={Verified} />
          <Route path='/adminaddbrand' component={AdminAddBrand} />
          <Route path='/adminaddcategory' component={AdminAddCategory} />
          <Route path='/testcardprod' component={TestProdCard} />
          <Route path='/adminaddjumbotron' component={AdminAddJumbo} />
          <Route path='/checkout' component={CheckOut} />
          <Route path='/uploadpayment' component={uploadPembayaran} />
          <Route path='/adminorderchecked' component={AdminOrderChecked} />
          <Route path='/newarrivalproducts' component={newArrivalProduct} />
        </Switch>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      searchBoxTrue : state.searchbox.status,
      searchText: state.searchbox.searchtext,
      username: state.auth.username
  }
}


export default connect(mapStateToProps,{keepLogin, showCartUser})(App)