import React, { Component } from 'react';
import { Divider, Paper } from '@material-ui/core'
import { Form, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'
import { onPaymentProcess } from '../Action'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { Alert } from 'reactstrap'
import numeral from 'numeral'

class CheckOut extends Component {
    state = { 
        error: '',
        uploadBerhasil: false
     }

    // =================================================== RENDER ANYTHING START ==============================================
        
    // =================================================== RENDER ANYTHING END   ========================================

    //  ================================================== CHECKOUT BUTTON START ========================================
        onBtnPayment = () => {
            
            var recipient = this.refs.name.value
            var phone = this.refs.phone.value
            var adress = this.refs.adress.value
            var city = this.refs.city.value
            var zip = this.refs.zip.value
            var username = this.props.username
            var cart = this.props.cart
            // console.log(cart)
            var totalharga = 0
            cart.forEach(element => {
                totalharga+=element.totalprice
            });
            console.log(totalharga)
            var data = {
                transaction:{
                    recipient,
                    phone,
                    adress,
                    city,
                    zip,
                    username,
                    totalharga,
                    
                },
                transactionItem: cart
                
            }

            if(recipient === '' || phone === 0 || adress === '' || city === '' || zip === 0){
                this.setState({error:'Fill all the form !!!'})
            }else{
                Axios.post(API_URL+'/cart/addtransaction', data)
                .then((res) => {
                   this.setState({uploadBerhasil: true})
                   console.log(this.state.uploadBerhasil)
                return <Redirect to='/uploadpayment' />

                })
                .catch((err) => {
                    console.log(err)
                })
            }
          
            
            

        }


    // =================================================== CHECKOUT BUTTON ENDS =========================================
        renderError = () => {
              return (  
              <Alert color='danger'>
                  {this.state.error}
                </Alert>)
        }
    
        renderCart = () => {
            return this.props.cart.map((item) => {
                return (
                    <div className="order-col">
                        <div>{item.qty}X {item.name}</div>
                        <div>{`Rp.${numeral(item.totalprice).format('0,0')}`}</div>
                    </div>
                )
            })
        }

        renderTotalPrice = (params) => {
            if(params){
              var totalPrice = 0
              params.forEach((val) => {
                totalPrice+= val.totalprice
              })
              return totalPrice
            }
          }

    render() { 
       return(
           <div>
                <div id="breadcrumb" className="section">
                    {/* container */}
                    <div className="container">
                    {/* row */}
                    <div className="row">
                        <div className="col-md-12">
                        <h3 className="breadcrumb-header">Checkout</h3>
                        <ul className="breadcrumb-tree">
                            <li><a href="/">Home</a></li>
                            <li className="active">Checkout</li>
                        </ul>
                        </div>
                    </div>
                    {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-md-7">
              {/* Billing Details */}
              <div className="billing-details">
                <div className="section-title">
                  <h3 className="title">Billing address</h3>
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="first-name" ref='name' placeholder="Recipient's Name" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="address" ref='adress' placeholder="Address" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="city" ref='city' placeholder="City" />
                </div>
                <div className="form-group">
                  <input className="input" type="text" name="zip-code" ref='zip' placeholder="ZIP Code" />
                </div>
                <div className="form-group">
                  <input className="input" type="tel" name="tel" ref='phone' placeholder="Telephone" />
                </div>
              </div>
              {/* /Billing Details */}
            </div>
            {/* Order Details */}
            <div className="col-md-5 order-details">
              <div className="section-title text-center">
                <h3 className="title">Your Order</h3>
              </div>
              <div className="order-summary">
                <div className="order-col">
                  <div><strong>PRODUCT</strong></div>
                  <div><strong>TOTAL</strong></div>
                </div>
                <div className="order-products">
                  {/* product cart */}
                  {this.renderCart()}
                </div>
                <div className="order-col">
                  <div>Shiping</div>
                  <div><strong>FREE</strong></div>
                </div>
                <div className="order-col">
                  <div><strong>TOTAL</strong></div>
                  <div><strong className="order-total">{`Rp.${numeral(this.renderTotalPrice(this.props.cart)).format('0,0')}`}</strong></div>
                </div>
              </div>
              <div className="payment-method">
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-1" />
                  <label htmlFor="payment-1">
                    <span />
                    Direct Bank Transfer
                  </label>
                  <div className="caption">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-2" />
                  <label htmlFor="payment-2">
                    <span />
                    Cheque Payment
                  </label>
                  <div className="caption">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-3" />
                  <label htmlFor="payment-3">
                    <span />
                    Paypal System
                  </label>
                  <div className="caption">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
              </div>
              <div className="input-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  <span />
                  I've read and accept the <a href="#">terms &amp; conditions</a>
                </label>
              </div>
              <a href="#" className="primary-btn order-submit">Place order</a>
            </div>
            {/* /Order Details */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
           </div>
       
       )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        cart: state.cart.cart
    }
}
 
export default connect (mapStateToProps,{onPaymentProcess})(CheckOut);