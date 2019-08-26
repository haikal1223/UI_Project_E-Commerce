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


class App extends React.Component {
  state = {
    isOpen: false,
    cartAddOn: 86
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <GoSearch className='search-icon' />
        <Link to='/mycart'>
          <IoIosCart className='flex-center cart-icon'   />
            {this.state.cartAddOn < 1 ? null :
            <span className='cart-notif'>{this.state.cartAddOn}</span>
          }
        </Link>
        <Navbar color="success" light expand="md" style={{position:'fixed', zIndex:'1', width: '100%'}} >
          <Link to='/'>
          <NavbarBrand className='logo' >Furion</NavbarBrand>
          </Link>
          <NavbarToggler className='ml-auto'  onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar className='col'>
          <div className='mr-4'>
          <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <span className='category-list' style={{color: 'white',fontWeight:'600'}}>BRAND</span>
                </DropdownToggle>
                <DropdownMenu >
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                    <DropdownItem>
                    Reset
                    </DropdownItem>
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
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>          
            </Nav>
          </div>
          {/* <Link style={{textDecoration:'none'}}>
            <Nav>
              <NavItem>
                <NavLink className='on-sale' style={{cursor: 'pointer', borderRadius : '5px', color:'white', backgroundColor: 'red',fontWeight: '600'}}>SALE</NavLink>
              </NavItem>
            </Nav>
          </Link> */}
        
        <div className='ml-auto'>
        
        <FaUserCog/>
            
        </div>
          </Collapse>
                  
      {/* ============================== USER SECTION START======================================= */}

        </Navbar>
      </div>
    );
  }
}
export default App