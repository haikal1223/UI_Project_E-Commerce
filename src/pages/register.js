import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import { onUserRegister } from '../Action'
import { Form} from 'react-bootstrap'
import {Paper} from '@material-ui/core'

class Register extends Component {
    state={
        justRegistered: false
    }

    // componentWillReceiveProps(newProps){
    //     console.log(this.props.username)
    //     console.log(newProps)
    //     if(this.props.username !== newProps.username){
    //         return <Redirect to='/waitingverification' />
    //     }
    // }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value
        var email = this.refs.email.value
        var password = this.refs.password.value
        console.log(this.props.role)
        this.props.onUserRegister({username, email, password})
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className='alert alert-danger'>{this.props.error}</p>
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <Spinner color='primary' />
        }
        return <input type="button"  className="btn btn-primary" defaultValue="Register" onClick={this.onBtnRegisterClick} />
    }

    render() {
        if(this.props.username === '') {
            return (
            <div className='login'>
                <div className='container' >
                    <div className='row justify-content-center mt-5'>
                        <div className='col-6'>
                            <Paper style={{marginTop:150}}  >
                            
                                <Form style={{padding : 15}}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" ref='email'/>
                                        <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control type="text" placeholder="username" ref="username" />
                                    </Form.Group>
                                
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" ref="password" />
                                    </Form.Group>
                        
                                    <div>
                                        {this.renderError()}
                                        </div>
                                        <div className='form-submit'>
                                        {this.renderButton()}
                                    </div>
                                </Form>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        return <Redirect to='/waitingverification' />
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        loading: state.auth.loading,
        error: state.auth.loading,
        role: state.auth.roleid
    }
}

export default connect(mapStateToProps, {onUserRegister})(Register)