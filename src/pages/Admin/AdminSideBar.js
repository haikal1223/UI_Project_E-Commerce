import React,{ Component} from 'react'
import {Link} from 'react-router-dom'
class sideNavBar extends Component {

    render() {
        return (
            <div className='bg-info pt-5 col-2' style={{height:'130vh', color:'white' }} >
            <Link to='/admin' style={{color: 'white '}}>
                <div style={{paddingBottom: 20}}>
                    <h4>Product Management</h4>
                </div>
            </Link >
            <Link to='/adminaddbrand'  style={{color: 'white '}}>
                <div style={{paddingBottom: 20}}>
                    <h4>Brand Management</h4>
                </div>
            </Link>
            <Link to='/adminaddcategory'  style={{color: 'white '}}>
                <div style={{paddingBottom: 20}}>
                    <h4>Manage Category</h4>
                </div>
            </Link>
            <Link to='/adminaddjumbotron'  style={{color: 'white '}}>
                <div style={{paddingBottom: 20}}>
                    <h4>Manage Jumbotron</h4>
                </div>
            </Link>
        </div>
        )
    }
}

export default sideNavBar