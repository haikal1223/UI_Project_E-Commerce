import React, { Component } from 'react';
import { Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import { onUserLogin } from '../Action'
import {Spinner} from 'reactstrap'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    onBtnLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        console.log(username)
        console.log(password)
        this.props.onUserLogin({ username, password });
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>;
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <Spinner color='primary' />
        }
        return <input type="button"  className="btn btn-primary" Value="Login" onClick={this.onBtnLoginClick} />
    }
    
    render() {
        if(this.props.username === ''){
            
            return (
                    <div className='login'>
                    <div className='container bg-register'>
                        <div className='row justify-content-center'>
                            <div className='col-6'>
                                <Paper style={{marginTop: 150}} className='container' >
                                    <h1>Login Form</h1>
                                    <input ref='username' className='form-control mt-3' type='text' placeholder='username' />
                                    <input ref='password' className='form-control mt-3' type='password' placeholder='password' />
                                    <div>
                                        {this.renderError()}
                                    </div>
                                    <div style={{margin : 15, paddingBottom: 15} }>
                                        {this.renderButton()}
                                    </div>
                                    <div>
                                    </div>
                                </Paper>
    
                            </div>
                        </div>
    
                    </div>
                    </div>
            )
        }
        return <Redirect to='/' />


    }
}
const mapStateToProps = (state) => {
    return {
            username: state.auth.username,
            loading: state.auth.loading,
            error: state.auth.error,
            role: state.auth.roleid
            };
}

export default connect(mapStateToProps,{onUserLogin})(Login)