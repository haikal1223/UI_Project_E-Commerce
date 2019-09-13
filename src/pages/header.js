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
import { Box } from '@material-ui/core';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onSearchBox, onSearchBoxFalse} from '../Action/searchBox'
import {onUserLogOut} from '../Action'


class App extends React.Component {
  state = {
    isOpen: false,
    cartAddOn: 86,
    categoryDrop: [],
    brandDrop: [],
    searched: [],
    search: false,
    searchtext: ''
  }
  componentDidMount(){
    Axios.get('http://localhost:1999/category/getcategory')
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
    this.props.onUserLogOut()
}

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  renderDropdownUserorAdmin = () => {
    if(this.props.username !=='' && this.props.roleid === 2){
      return(
        <div>
        <Link to='/login'>
        <DropdownItem>Login</DropdownItem>
        </Link>
        <DropdownItem onClick={this.onBtnLogOutClick}>LogOut</DropdownItem>

        </div>
      )
    }else if (this.props.username !=='' && this.props.roleid === 1) {
      return(
        <div>
        <DropdownItem>{this.props.username}</DropdownItem>
        <Link to='/admin'>
        <DropdownItem>Admin</DropdownItem>
        </Link>
        <DropdownItem onClick={this.onBtnLogOutClick}>LogOut</DropdownItem>

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

  onSearchBox = () => {
    var searched = this.refs.search.value
    this.setState({searchtext: searched})
    
  }

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
          <div  className='search-icon'>
            <a href ={`/showcase?showsearched=${this.state.searchtext}`} >
              {console.log(this.props.searchtext)}
          <GoSearch onClick={this.onSearchBox} /> 
            </a>
          <input type='search'  ref='search' placeholder='What do you need ?'  />
          
          </div>
          <Link to='/mycart'>
            <IoIosCart className=' cart-icon' style={{position:'absolute', right:120, top: 13}}  />
              {this.state.cartAddOn < 1 ? null :
              <span className='cart-notif' style={{position:'absolute',right: 115, top: 10 }}>{this.state.cartAddOn}</span>
            }
          </Link>

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
      searchBoxTrue : state.searchBox,
      t: state.searchbox.searchtext,
      username: state.auth.username,
      roleid: state.auth.roleid

  }
}

export default connect(mapStateToProps,{onSearchBox,onSearchBoxFalse, onUserLogOut})(App)