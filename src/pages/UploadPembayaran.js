import React, { Component } from 'react';
import {Table, CustomInput} from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'

class UploadPembayaran extends Component {
    state = { 
        transaksi : []
     }

     componentWillReceiveProps(newprops){
        if(this.props.username !== newprops.username){
            console.log(newprops.username)
            Axios.get(`${API_URL}/cart/gettransaction/` + newprops.username)
            .then((res) => {
                
                this.setState({transaksi: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        }
     }

    renderTransaksi = () => {
       return this.state.transaksi.map((item) => {
           if(item.status !== 'Rejected By Admin'){
               return (
                   
                   <tr>
                       <td>{item.id}</td>
                       <td>
                           {
                               item.status ==='waitingConfirmation' ?
                               <p>Tunggu Konfirmasi Dari Admin</p>:
                               null
                           }
                           {
                               item.status === 'Accepted By Admin' ?
                               <CustomInput type='file'  />
                               : null
                            }
                            {
                                item.status === 'Shipment' ?
                                <p>Barang telah Di Kirim</p>
                                : null
                            }
                            {
                                item.status === 'package received' ?
                                <p> Thanks for shoping </p> :null
                            }
                            {
                                item.status === 'package not received' ?
                                <p>Hubungi Admin</p> : null
                            }           
                   </td>
                   {
                       item.status ==='Shipment'?
                       <td>
                           <input type='button' className='btn btn-success' value='Come'  />
                           <input type='button' className='btn btn-danger' value='Dont Come'  />
                       </td>
                       : null
                   }
                   <td>{item.status.toUpperCase()}</td>
               </tr>
           )
        }
       })
    }




    render() { 
        return ( 
            <div style={{marginTop: 70}} className='container'>
                <Table bordered striped dark>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>BUKTI PEMBAYARAN</th>
                            <th> STATUS </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransaksi()}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </Table>
            </div>
         );
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}
 
export default connect(mapStateToProps)(UploadPembayaran);