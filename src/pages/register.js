import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import Loader from 'react-loader-spinner'
import Axios from 'axios'
import {OnRegisterSuccess} from '../../redux/Action'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'


class Register extends Component {
    state={
        error : '',
        loading : false
    }
    onBtnClickRegister = () =>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        var confirm = this.refs.confirm.value
        if(username === '' || password ===''|| confirm === ''){
            this.setState({error : 'Semua Form Harus diisi'})
        }else{
            if(confirm !== password){
                this.setState({error : 'Pasword and Confirm must be same'})
            }else{
                this.setState({loading : true })
                // Ngecek username udah ada atau belum
                Axios.get('http://localhost:2001/users?username=' + username)
                .then((res) =>{
                    if(res.data.length > 0){
                        this.setState({error : 'Username has been taken',loading : false})
                    }else{
                        Axios.post('http://localhost:2001/users',{username,password})
                        .then((res) =>{
                        this.props.OnRegisterSuccess(res.data)
                        // paramater pertama key / terserah, untuk get data
                        localStorage.setItem('terserah', res.data.username)
                        this.setState({loading : false})
                        })
                        .catch((err) =>{
                            console.log(err);
                            
                        })
                    }            
                })
                .catch((err) =>{
                    console.log(err);
                    
                })
            }

        }

    }
    closeError = () => {
        this.setState({error : ''})
    }
    render(){
        if(this.props.user.username !== ''){
            return(
                <Redirect to='/' />
            )
        }
        return(
            <div className = 'container bg-register'>
                <div className = 'row justify-content-center mt-5'>
                    <div className = 'container'>
                        <Paper>
                        <h1>Register</h1>
                        <input className='form-control mt-3' ref='username' type='text' placeholder='Username' />
                        <input className='form-control mt-3' ref='password' type='password' placeholder='Password' />
                        <input className='form-control mt-3' ref='confirm'  type='password' placeholder='Confirm Password'/>
                        {this.state.error === '' ? null : 
                        <div className='alert alert-danger mt-3'>{this.state.error} <span style={{
                            fontWeight : 'bold', cursor : 'pointer', float : 'right'
                        }} onClick={this.closeError}> x
            
                        </span>
                        </div>}
                        {this.state.loading === true ? 
                        <Loader type='ThreeDots' color = 'black' width = '40px' /> :
                        <input type='button' className='btn btn-primary mt-3 mb-2 ' value='Register Now'
                        onClick={this.onBtnClickRegister}/>}
                        
                        </Paper>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.user
    }
}
export default connect(mapStateToProps,{OnRegisterSuccess}) (Register)