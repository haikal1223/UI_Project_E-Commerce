import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../../API_URL';
import SideNavbar from './AdminSideBar'
import { Table } from 'reactstrap'

class AdminHistoryTransaction extends Component {
    state = { 
        transaction : []
     }

     componentDidMount(){
        Axios.get(`${API_URL}/cart/gettransactionadmin`)
        .then((res) => {
            console.log(res.data)
            this.setState({transaction: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
     
    renderTransactionList = () => {
        return this.state.transaction.map((item) => {
            if(item.status === 'package delivered'){
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.status}</td>
                        <td>
                            <img src={`${API_URL}${item.image_upload}`} alt='gambar' width={100} />
                        </td>
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
                    </tr>
                </thead>
                <tbody>
                    {this.renderTransactionList()}
                </tbody>
                <tfoot>

                </tfoot>
            </Table>
            </div>
        </div>
         );
    }
}
 
export default AdminHistoryTransaction;