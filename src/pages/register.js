import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import { onUserRegister } from '../Action'
import { Form, Button} from 'react-bootstrap'

class Register extends Component {
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
        return <input type="button" name="submit" id="submit" className="submit" defaultValue="Register" onClick={this.onBtnRegisterClick} />
    }

    render() {
        if(this.props.username === '') {
            
            return (
                <div className='container' style={{marginTop: 70}}>
                   <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref='email'/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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