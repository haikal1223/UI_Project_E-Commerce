import React, { Component } from 'react';
import { Divider, Paper } from '@material-ui/core'
import { Form, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import { onPaymentProcess } from '../Action'
import Axios from 'axios';
import { API_URL } from '../API_URL';
class CheckOut extends Component {
    state = { 
        listCart : [],
       

     }

    // =================================================== RENDER ANYTHING START ==============================================
        
    // =================================================== RENDER ANYTHING END   ========================================

    //  ================================================== CHECKOUT BUTTON START ========================================
        onBtnPayment = () => {
            var recipient = this.refs.name.value
            var phone = this.refs.phone.value
            var adress = this.refs.adress.value
            var city = this.refs.adress.value
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

            Axios.post(API_URL+'/cart/addtransaction', data)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            
            

        }


    // =================================================== CHECKOUT BUTTON ENDS =========================================

    

    render() { 
        return ( 
            <div className='container' style={{marginTop: 75}}>
                <div className='row'>
                    <div className='col-md-7'>
                        <Paper>
                            <h1 style={{padding:15}}>CheckOut</h1>
                            <Divider variant='fullWidth' style={{border:'1px solid black',margin:15}}  />
                            <Form style={{padding: 15, margin: 15}}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridRecipient">
                                    <Form.Label>Recipient's Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" ref='name' />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Phone Number"  ref='phone'/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Full Address</Form.Label>
                                    <Form.Control placeholder="Fill in the street name, house number, building number, floor or unit number "  ref='adress' />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control placeholder='Enter City Name' ref='city'  />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control type='number' placeholder='Enter Zip Code' ref='zip' />
                                    </Form.Group>
                                </Form.Row>


                                <input type='button' className='btn btn-primary' value='Proceed To Payment' onClick={this.onBtnPayment} />
                            </Form>
                        </Paper>

                    </div>
                </div>

            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        cart: state.cart.cart
    }
}
 
export default connect (mapStateToProps,{onPaymentProcess})(CheckOut);