import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';
import {FaEnvelope, FaPhone} from 'react-icons/fa'

class Footer extends Component {
    state = { 
      categoryDrop: [],
      brandDrop: [],
      }

    componentDidMount(){
        Axios.get('http://localhost:1999/category/getcategory')
        .then((res) => {
          this.setState({categoryDrop: res.data})
          console.log(this.state.categoryDrop)
        })
        .catch((err)=>{
          console.log(err);
        })

        Axios.get(`${API_URL}/brand/getbrand`)
        .then((res) => {
          this.setState({brandDrop: res.data})
        })
        .catch((err) => {
          console.log(err)
        })
    }

    renderCatFooter = () => {
        return this.state.categoryDrop.map((item) => {
            return( 
                <li><a href={`showcase?category=${item.id}`}>{item.name}</a></li>
            )
        })
    }

    renderBrandFooter = () => {
      return this.state.brandDrop.map((item) => {
        return (
          <li><a href={`showcase?brand=${item.id}`}>{item.name}</a></li>
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
                      <li><FaPhone /> 081-xxx-xxx</li>
                      <li><FaEnvelope/>muhammadhaikal507@gmail.com</li>
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
                    <h3 className="footer-title">Brands</h3>
                    <ul className="footer-links">
                     {this.renderBrandFooter()}
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