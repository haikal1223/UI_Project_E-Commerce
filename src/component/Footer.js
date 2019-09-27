import React, { Component } from 'react';
import Axios from 'axios';

class Footer extends Component {
    state = { categoryDrop: [] }

    componentDidMount(){
        Axios.get('http://localhost:1999/category/getcategory')
        .then((res) => {
          this.setState({categoryDrop: res.data})
          console.log(this.state.categoryDrop)
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    renderCatFooter = () => {
        return this.state.categoryDrop.map((item) => {
            return( 
                <li><a href={`showcase?category=${item.id}`}>{item.name}</a></li>
            )
        })
    }

    render() { 
        return ( 
            <footer id="footer">

            <div className="section">
            {/* container */}
            <div className="container">
              {/* row */}
              <div className="row">
                <div className="col-md-3 col-xs-6">
                  <div className="footer">
                    <h3 className="footer-title">About Us</h3>
                    <p>this is my e-commerce web application project dedicated for my final project presentation for Job Connector program at Purwadhika Startup and Coding School.</p>
                    <ul className="footer-links">
                      <li><i className="fa fa-map-marker" />1734 Stonecoal Road</li>
                      <li><i className="fa fa-phone" />+021-95-51-84</li>
                      <li><i className="fa fa-envelope-o" />muhammadhaikal507@gmail.com</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-xs-6">
                  <div className="footer">
                    <h3 className="footer-title">Categories</h3>
                    <ul className="footer-links">
                     {this.renderCatFooter()}
                    </ul>
                  </div>
                </div>
                <div className="clearfix visible-xs" />
                <div className="col-md-3 col-xs-6">
                  <div className="footer">
                    <h3 className="footer-title">Information</h3>
                    <ul className="footer-links">
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="#">Orders and Returns</a></li>
                      <li><a href="#">Terms &amp; Conditions</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-xs-6">
                  <div className="footer">
                    <h3 className="footer-title">Service</h3>
                    <ul className="footer-links">
                      <li><a href="#">My Account</a></li>
                      <li><a href="#">View Cart</a></li>
                      <li><a href="#">Wishlist</a></li>
                      <li><a href="#">Track My Order</a></li>
                      <li><a href="#">Help</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /row */}
            </div>
            {/* /container */}
          </div>
          </footer>

         );
    }
}
 
export default Footer ;