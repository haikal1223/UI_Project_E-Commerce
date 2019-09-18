import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { API_URL } from '../API_URL';


class WaitingVerification extends Component {

    onBtnResendEmailClick = () => {
        axios.post(API_URL + '/user/resendemailver', {
            username: this.props.username,
            email: this.props.email
        }).then((res)=>{
            console.log(res.data)
            alert('Email Berhasil Terkirim !')
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <h2>Tolong Diperhatikan</h2>
                <p>Silahkan mengecheck email anda untuk verifikasi account anda</p>
                <p>
                    Bila anda tidak mendapatkan email dari Furion,
                    Tekan tombol Di bawah ini
                    
                </p>
                <input type="button" value="Resend Email" onClick={this.onBtnResendEmailClick} />
            </div>
        )
    }
}

const mapStateToProps = ({auth}) =>{ //destructor global state / redux
    return {
        email : auth.email,
        username : auth.username

             }
}

export default connect(mapStateToProps)(WaitingVerification);