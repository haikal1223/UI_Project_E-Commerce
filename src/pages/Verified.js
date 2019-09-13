import React, {Component} from 'react'
import axios from 'axios'
import queryString from 'query-string';
import { API_URL } from '../API_URL';

class Verified extends Component {  
    state = {
        status: 'Loading'
    }

    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        console.log(params);
        var username = params.username
        var password = params.password
        axios.put(`${API_URL}/user/verifikasiemail`,{
            username,
            password
        }).then((res)=>{
            console.log(res.data);
            this.setState({status : 'Berhasil'})
        }).catch((err)=>{
            console.log(err);
            this.setState({status : 'Gagal'})
        })
    }

    render(){
        if(this.state.status === 'Berhasil'){
            return(
                <div>
                    <center>
                        <h1>Email anda sukses ter-verifikasi</h1>
                        <h1>Selamat Bergabung di Furion</h1>
                    </center>
                </div>
            )
        }

        else if(this.state.status === 'Gagal'){
            return(
                <div>
                    <center>
                        <h1>Gagal Mengverifikasi Email anda !</h1>
                        <h1>Mohon direfresh pagenya kembali !</h1>
                    </center>
                </div>
            )
        }

        return(
            <div>
                <center>
                    <h1>Sedang Mengverifikasi mohon di tunggu ...</h1>
                </center>
            </div>
        )
        
    }
}

export default Verified