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
    loading: false
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
        <DropdownItem>{this.props.username}</DropdownItem>
        <DropdownItem onClick={this.onBtnLogOutClick} href='/'>LogOut</DropdownItem>

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
// ===========================================================================================================
  render() {
    
    return (
      <div>
        <Navbar color="success" light expand="md" style={{position:'fixed', zIndex:'1', width: '100%', top:0,right: 0, left: 0}} >
          <Link to='/'>
          <NavbarBrand className='logo' >Furion</NavbarBrand>
          </Link>
          <NavbarToggler className='ml-auto'  onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar >
          <div className='mr-4'>
          <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <span className='category-list' style={{color: 'white',fontWeight:'600'}}>BRAND</span>
                </DropdownToggle>
                <DropdownMenu >
                   {this.renderBrandList()}
                </DropdownMenu>
                </UncontrolledDropdown>          
            </Nav>          
          </div>
          <div className= 'mr-3'>
          <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <span className='category-list' style={{color: 'white',fontWeight:'600'}}>CATEGORIES</span>
                </DropdownToggle>
                <DropdownMenu >
                    {this.renderCategoryList()}
                </DropdownMenu>
                </UncontrolledDropdown>          
            </Nav>
          </div>
          {/* SEARCH BAR START */}
          <div  className='search-icon'>
            <a href ={`/showcase?showsearched=${this.props.inputsearch}`} >
          <GoSearch  /> 
            </a>
          <input type='search' onChange={(text) => this.props.onSearchBox(text.target.value)} placeholder='What do you need ?'  />
          
          </div>
          <div>
            <IoIosCart className=' cart-icon' style={{position:'absolute', right:120, top: 13}} onClick={() => this.setState({modalOpen: true})} />
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
              {this.state.cartAddOn < 1 ? null :
              <span className='cart-notif' style={{position:'absolute',right: 115, top: 10 }}>{this.props.cartCount}</span>
            }
          </div>

        <UncontrolledDropdown nav inNavbar style={{position:'absolute', right: 20, top: -15}}>
                <DropdownToggle nav caret>
                  <FaUserCog className='ml-auto user-dropdown' />
                  
                </DropdownToggle>
                <DropdownMenu right >
                {this.renderDropdownUserorAdmin()}
                </DropdownMenu>
                </UncontrolledDropdown>  
          </Collapse>
                  
        </Navbar>
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