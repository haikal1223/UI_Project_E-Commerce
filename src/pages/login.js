import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'reactstrap'
import { Paper } from '@material-ui/core'

class Login extends Component {
    state={
        errorMessage: ''
    }

    // componentDidMount() {
    //     document.body.classList.add('login')
    // }
    render() {
        return (
                <div className='login'>
                <div className='container ' style={{marginTop: 100}}>
                    <div className='row justify-content-center mt-5'>
                        <div className='col-12'>
                            <Paper >
                                <h1>Login Form</h1>
                                <input ref='username' className='form-control mt-3' type='text' placeholder='username' />
                                <input ref='email' className='form-control mt-3' type='text' placeholder='email' />
                                <input ref='password' className='form-control mt-3' type='text' placeholder='password' />
                                <input ref='confirm' className='form-control mt-3' type='text' placeholder='confirm password' />
                            </Paper>

                        </div>
                    </div>

                </div>
                </div>


        

        )
    }
}

export default Login