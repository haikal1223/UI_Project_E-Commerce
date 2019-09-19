import React, { Component } from 'react';
import {Table} from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../../API_URL';
import SideNavbar from '../Admin/AdminSideBar'

class AdminOrderCheck extends Component {
    state = { 
        transactionList: []
     }

    componentDidMount(){
        Axios.get(`${API_URL}/cart/gettransactionadmin`)
        .then((res) => {
            console.log(res.data)
            this.setState({transactionList: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAccepted = (id) =>{

        Axios.put(`${API_URL}/transaction/acceptedbyadmin/${id}`)
        .then((res) => {
            Axios.get(`${API_URL}/cart/gettransactionadmin`)
            .then((res) => {
                console.log(res.data)
                this.setState({transactionList: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnRejected = (id) => {
        Axios.put(`${API_URL}/transaction/rejectedbyadmin/${id}`)
        .then((res) => {
            Axios.get(`${API_URL}/cart/gettransactionadmin`)
            .then((res) => {
                console.log(res.data)
                this.setState({transactionList: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnSendPackage = (id) => {
        Axios.put(`${API_URL}/transaction/packagedelivered/${id}`)
        .then((res) => {
            Axios.get(`${API_URL}/cart/gettransactionadmin`)
            .then((res) => {
                console.log(res.data)
                this.setState({transactionList: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    
    // ================================================= RENDER =========================================
    renderTransaction = () => {
        return this.state.transactionList.map((item) => {     
                if(item.status !== 'package received'){
                    return ( <tr>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.tanggal}</td>
                        <td>{item.recipient}</td>
                        <td>{item.adress}</td>
                        <td>{item.city}</td>
                        <td>{item.zip}</td>
                        <td>{item.status}</td>
                        <td><img src={`${API_URL}${item.image_upload}`} width={100} alt='image' /></td>
                        {
                            item.status === 'waitingConfirmation' ?
                            <div>
        
                                <td><input type='button' className='btn btn-success'  value='Accepted' onClick={() => this.onBtnAccepted(item.id)}/></td> 
                                <td><input type='button' className='btn btn-danger'  value='Rejected' onClick={() =>  this.onBtnRejected(item.id)}/></td> 
                            </div>
                            : null
                        }
                        {
                            item.status === 'image being checked' ?
                            <div>
                                <td><input type='button' className='btn btn-success'  value='Accepted' onClick={() => this.onBtnSendPackage(item.id)}/></td> 
                                <td><input type='button' className='btn btn-danger'  value='Rejected' onClick={() =>  this.onBtnRejected(item.id)}/></td> 
                            </div>
                            : null
                        }
                        {
                            item.status === 'accepted by admin' ?
                            <p>Here comes the money</p> : null
                        }
                        {
                            item.status === 'package delivered' ?
                            <p>Waiting User Confirmation</p> : null
                        }
                    </tr>
                   )
                }
            
        })
    }

    render() { 
        return ( 
            <div style={{marginTop: 70, }} className='row '>
                <SideNavbar/>
                <div className='container ' style={{width: '80vw'}}>
                <Table bordered striped dark >
                    <thead>
                        <tr>
                            <th>ID TRANSAKSI</th>
                            <th>USERNAME</th>
                            <th>DATE</th>
                            <th>RECEPIENT</th>
                            <th>ADRESS</th>
                            <th>CITY</th>
                            <th>ZIP</th>
                            <th>STATUS</th>
                            <th>IMAGE</th>
                            <th>DETAIL</th>
                            <th colSpan='2'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransaction()}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </Table>
                </div>
            </div>
         );
    }
}
 
export default AdminOrderCheck;