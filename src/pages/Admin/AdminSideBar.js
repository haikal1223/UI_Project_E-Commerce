import React,{ Component} from 'react'
import {Link} from 'react-router-dom'
class sideNavBar extends Component {

    render() {
        return (
            <div className='container'>

            <div id="breadcrumb" className="section">
            {/* container */}
            <div className="container">
                {/* row */}
                <div className="row">
                <div className="col-md-12">
                    <ul className="breadcrumb-tree">
                    <li><a href="/">Home</a></li>
                    <li><a href="/admin">Admin All Products</a></li>
                    <li><a href='/adminaddbrand'>Admin Brand</a></li>
                    <li><a href='/adminaddcategory'>Admin Category</a></li>                    
                    <li><a href='/adminaddjumbotron'>Admin Jumbotron</a></li>                    
                    <li><a href='/adminorderchecked'>Admin Order Check</a></li>                    
                    <li><a href='/adminhistorytransaction'>Admin History Transaction</a></li>                    
                    </ul>
                </div>
                </div>
                {/* /row */}
            </div>
            {/* /container */}
            </div>
            </div>
        )
    }
}

export default sideNavBar