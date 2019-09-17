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

    onBtnAccepted = (id,qty) =>{

        // Axios.put(`${API_URL}/transaction/acceptedbyadmin/${id}`)
        // .then((res) => {
        //     Axios.get(`${API_URL}/cart/gettransactionadmin`)
        //     .then((res) => {
        //         console.log(res.data)
        //         this.setState({transactionList: res.data})
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // })
        // .catch((err) =>{

        // })
    }

    renderTransaction = () => {
        return this.state.transactionList.map((item) => {     
                if(item.status !== 'accepted by admin'){
                    return ( <tr>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.status}</td>
                        <td>{item.image}</td>
                        {
                            item.status === 'waitingConfirmation' ?
                            <div>
        
                                <td><input type='button' className='btn btn-success'  value='Accepted' onClick={() => this.onBtnAccepted(item.id)}/></td> 
                                <td><input type='button' className='btn btn-danger'  value='Rejected'/></td> 
                            </div>
                            : null
                        }
                        {
                            item.status === 'image being checked' ?
                            <div>
                                <td><input type='button' className='btn btn-success'  value='Accepted'/></td> 
                                <td><input type='button' className='btn btn-danger'  value='Rejected'/></td> 
                            </div>
                            : null
                        }
                        {
                            item.status === 'Shipment' ?
                            <td colSpan='2'><p>On the Way</p></td> :
                            null
                        }
                        {
                            item.status === 'accepted by admin' ?
                            <p>Accepted gan</p> : null
                        }
                    </tr>
                   )
                }
            
        })
    }

    render() { 
        return ( 
            <div style={{marginTop: 70}} className='row'>
                <SideNavbar/>
                <div className='container'>
                <Table bordered striped dark>
                    <thead>
                        <tr>
                            <th>ID TRANSAKSI</th>
                            <th>USERNAME</th>
                            <th>STATUS</th>
                            <th>IMAGE</th>
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