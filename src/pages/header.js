import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import {GoSearch} from 'react-icons/go'
import {IoIosCart} from 'react-icons/io'
import { FaUserCog } from "react-icons/fa";
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onSearchBox, onSearchBoxFalse} from '../Action/searchBox'
import {onUserLogOut, cartContent} from '../Action'
import { 
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
        Table
        } from 'reactstrap'



class App extends React.Component {
  state = {
    isOpen: false,
    cartAddOn: 86,
    categoryDrop: [],
    brandDrop: [],
    searched: [],
    search: false,
    searchtext: '',
    modalOpen: false,
    loading: false,
    brandLimit: null
  }
  componentDidMount(){
    const token = localStorage.getItem('token')
        const headers = {
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        }
    Axios.get('http://localhost:1999/category/getcategory',headers)
    .then((res) => {
      this.setState({categoryDrop: res.data})
      console.log(this.props.location)
    })
    .catch((err)=>{
      console.log(err);
    })

    Axios.get(API_URL + '/brand/getbrand')
    .then((res) => {
      this.setState({brandDrop: res.data})
    })
    .catch((err) => {
      console.log(err)
    })

    Axios.get(`${API_URL}/brand/getbrandhome`)
    .then((res) => {
      console.log(res.data)
      this.setState({brandLimit: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  
  }
  

  
  
  
  onBtnLogOutClick = () =>{
    this.props.onUserLogOut();
}

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // ======================= MODAL SECTION =====================
    closeModal = () => {
      this.setState({modalOpen:false})
  } 
  // ===========================================================

  // ====================== BUTTON REMOVE CART =================
      onBtnRemoveClick = (id) => {
        var data = {
          username: this.props.username,
          productid:id
        }
        console.log('username remove')
        console.log(data)

        Axios.put(API_URL+'/cart/deletecart', data)
        .then((res) => {
          let object = {
            cart: res.data.cartUser,
            cartCount: res.data.cartCount
    }
      this.props.cartContent(object)
        })
        .catch((err) => {
            console.log(err)
        })
      }
  // ===========================================================


  renderDropdownUserorAdmin = () => {
    if(this.props.username !=='' && this.props.roleid === 2){
      return(
        <div>
        <DropdownItem disabled>{this.props.username}</DropdownItem>
        <DropdownItem onClick={this.onBtnLogOutClick} href='/'>LogOut</DropdownItem>
        <DropdownItem href='/uploadpayment'>Payment</DropdownItem>

        </div>
      )
    }else if (this.props.username !=='' && this.props.roleid === 1) {
      return(
        <div>
        <DropdownItem>{this.props.username}</DropdownItem>
        <Link to='/admin'>
        <DropdownItem>Admin</DropdownItem>
        </Link>
        <DropdownItem onClick={this.onBtnLogOutClick} href='/'>LogOut</DropdownItem>

        </div>
      )
    }
    else{
      return(
        <div>
        <Link to='/login'>
        <DropdownItem>Login</DropdownItem>
        </Link>
        <Link to='/register'>
        <DropdownItem>Register</DropdownItem>
        </Link>

        </div>
      )
    }
  }

renderBrandList = () => {
  return this.state.brandDrop.map((val) => {
    return(
      <DropdownItem href={'showcase?brand=' + val.id}>
        {val.name}
      </DropdownItem>
    )
  })
}

  renderCategoryList = () => {
      return this.state.categoryDrop.map((item) => {
        return(
          <DropdownItem href={'showcase?category=' + item.id} >
            {item.name}
          </DropdownItem>
        )
      })
  }

 
    
  
// =================================================== RENDER CART START =====================================
        onRenderCart = () => {
          return this.props.cart.map((item) => {
            return(
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{item.totalprice}</td>
                <td><input type='button' className='btn btn-danger' value='X' onClick={() => this.onBtnRemoveClick(item.productid)}/></td>
              </tr>
            )
          })
        }

        totalPrice = (params) => {
          if(params){
            var totalPrice = 0
            params.forEach((val) => {
              totalPrice+= val.totalprice
            })
            return totalPrice
          }
        }
// ===========================================================================================================
  render() {
    
    return (
      <div>
        <div id="header">
        {/* container */}
        <div className="container pt-4">
          {/* row */}
          <div className="row">
            {/* LOGO */}
            <div className="col-md-2">
              <div className="header-logo">
                <a href="/" className="logo ">
                  <h3 className='text-white mt-3'>FURION</h3>
                </a>
              </div>
            </div>
            {/* /LOGO */}
            {/* SEARCH BAR */}
            <div className="col-md-7">
              <div className="header-search">
                <form>
                  <input className="input rounded-pill" style={{width: 550, textAlign:'center'}} onChange={(text) => this.props.onSearchBox(text.target.value)} placeholder='What do you need ?'  type='search' />
                  <a href ={`/showcase?showsearched=${this.props.inputsearch}`} className="search-btn" style={{ marginLeft: -20, padding: '0.7rem 1rem'}}>Search</a>
                </form>
              </div>
            </div>
            {/* /SEARCH BAR */}
            {/* ACCOUNT */}
            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                {/* Wishlist */}
                <div>
                  <a href="#" onClick={() => this.setState({modalOpen: true})}>
                  <i><IoIosCart className=' cart-icon'  /></i> 
                        {/* MODAL CART START */}
            <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
              <ModalHeader>

              </ModalHeader>
              <ModalBody>
              {console.log(this.props.cart)}
              <Table bordered dark striped >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th>TOTAL PRICE</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.onRenderCart()}
                </tbody>
                <tfoot>
                 <tr>
                   <td>
                     Rp. {this.totalPrice(this.props.cart)}
                   </td>
                 </tr>
                </tfoot>
              </Table>
              </ModalBody>
              <ModalFooter>
                <Link to='/checkout'>
                <input type='button' className='btn btn-danger' value='CHECKOUT' onClick={()=> this.setState({modalOpen: false})} />
                </Link>
              </ModalFooter>

            </Modal>
            {/* MODAL CART ENDS 1 */}                  
                    <span>Your Cart</span>
                    <div className="qty">{this.props.cartCount}</div>
                  </a>
                </div>
                {/* /Wishlist */}
                {/* Cart */}
                <div className="dropdown">
                  <a>
                  <FaUserCog className='ml-auto user-dropdown' />
                    <p className='text-white'>My Account</p>
                  </a>
                  <UncontrolledDropdown nav inNavbar style={{position:'absolute', right: 20, top: -15}}>
                <DropdownToggle nav caret>
              
                  
                </DropdownToggle>
                <DropdownMenu right >
                {this.renderDropdownUserorAdmin()}
                </DropdownMenu>
                </UncontrolledDropdown>
                </div>
                {/* /Cart */}
                {/* Menu Toogle */}
                <div className="menu-toggle">
                  <a href="#">
                    <i className="fa fa-bars" />
                    <span>Menu</span>
                  </a>
                </div>
                {/* /Menu Toogle */}
              </div>
            </div>
            {/* /ACCOUNT */}
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      <nav id="navigation" className='p-3 '>
        {/* container */}
        <div className="container">
          {/* responsive-nav */}
          <div id="responsive-nav">
            {/* NAV */}
            <ul className="main-nav nav navbar-nav flex-row " style={{textDecoration:'none', color:'black'}}>
              <li className="active"><a href="/">Home</a></li>
              <li><a className='text-dark' href="/newarrivalproducts">New Arrival</a></li>
              <li><a className='text-dark' href="#">Categories</a></li>
              <li><a href="#">Laptops</a></li>
              <li><a href="#">Smartphones</a></li>
              <li><a href="#">Cameras</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
            {/* /NAV */}
          </div>
          {/* /responsive-nav */}
        </div>
        {/* /container */}
      </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      inputsearch: state.searchbox.searchtext,
      username: state.auth.username,
      roleid: state.auth.roleid,
      cart: state.cart.cart,
      cartCount: state.cart.cartCount

  }
}

export default connect(mapStateToProps,{onSearchBox,onSearchBoxFalse, onUserLogOut,cartContent})(App)