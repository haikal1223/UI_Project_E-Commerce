import React, { Component } from 'react';
import {Table} from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../../API_URL';
import SideNavbar from '../Admin/AdminSideBar'
import { Pagination, PaginationItem, PaginationLink, Modal,
    ModalHeader,
    ModalBody,} from 'reactstrap'
import numeral from 'numeral'

class AdminOrderCheck extends Component {
    state = { 
        transactionList: [],
        totalPages: 0,
        pages: 0,
        modalOpen: false,
        idtransaction: 0,
        transactionId: null,
        
     }

    componentDidMount(){
        const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
        Axios.get(`${API_URL}/cart/gettransactionadmin?page=${page}`)
        .then((res) => {
            console.log('ini res data di admin order check')
            console.log(res.data.dataProduct)
            this.setState({transactionList: res.data.dataProduct, totalPages: res.data.totalPages, pages: res.data.pages})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getDetail = (id) => {
         
        Axios.get(`${API_URL}/cart/gettransactiondetail/${id}`)
        .then((res) => {
            this.setState({transactionDetail: res.data, transactionId: id, modalOpen: true})
            console.log('ini get detail')
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
     }

    renderPagination = () => {
        let totalButton = []
        let listData = this.state.totalPages
        let totalPages = Math.ceil(listData / 6)
        for(var i = 1; i <= totalPages; i++){
            totalButton.push(<PaginationItem className='mr-2'>
                                <PaginationLink href={'adminorderchecked?page=' + (i)}>
                                    {i}
                                </PaginationLink>
                            </PaginationItem>)
                            console.log(i)
        }
        console.log(totalPages)
        console.log(totalButton)
        return totalButton
    }

    onBtnAccepted = (id) =>{

        Axios.put(`${API_URL}/transaction/acceptedbyadmin/${id}`)
        .then((res) => {
            Axios.get(`${API_URL}/cart/gettransactionadmin`)
            .then((res) => {
                console.log(res.data)
                this.setState({transactionList: res.data.dataProduct})
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
                this.setState({transactionList: res.data.dataProduct})
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
                this.setState({transactionList: res.data.dataProduct})
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
        return this.state.transactionList.map((item,i) => {     
                    return ( <tr>
                        <td>{i+1}</td>
                        <td>{item.username}</td>
                        <td>{item.tanggal.split('T')[0]}</td>
                        <td>{item.status}</td>
                        <td><img src={`${API_URL}${item.image_upload}`} width={100} alt={null} /></td>
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
                        <td>
                        {
                        item.status === 'accepted by admin' || item.status === 'package received' || item.status === 'image being checked' || item.status === 'waitingConfirmation' ?
                        <input type='button' className='btn btn-success' value='DETAILS' onClick={() => this.getDetail(item.id)} /> :
                        null
                    }
                        </td>

                    </tr>
                   )
                
            
        })
    }

    renderModal = () => {
        if(this.state.transactionId && this.state.transactionDetail.length !== 0){
            var jsx = this.state.transactionDetail.map((item, i) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.recipient}</td>
                            <td>{item.adress}</td>
                            <td>{item.city}</td>
                            <td>{item.zip}</td>
                            <td>{item.name}</td>
                            <td>{`Rp.${numeral(item.harga * item.qty).format('0,0')}`}</td>
                            <td>{item.qty}</td>

                        </tr>
                    )
            })
            return jsx
        }
    }

    render() { 
        return ( 
            <div style={{marginTop: 70, }} className='row '>
                <SideNavbar/>
                <div className='container ' style={{width: '80vw'}}>
                <Modal isOpen={this.state.modalOpen} toggle={() => this.setState({modalOpen:false})} scrollable style={{height:350}} className='modal-lg'>
                    <ModalHeader>
                        TRANSACTION DETAIL
                    </ModalHeader>
                    <ModalBody>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Recepient</th>
                                    <th>Adress</th>
                                    <th>City</th>
                                    <th>Zip</th>
                                    <th>Product</th>
                                    <th>Total Harga</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderModal()}
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </Table>
                    </ModalBody>
                 

                </Modal>
                <Table bordered striped dark >
                    <thead>
                        <tr>
                            <th>ID TRANSAKSI</th>
                            <th>USERNAME</th>
                            <th>DATE</th>
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
                <Pagination
                    aria-label="Page navigation example" style={{marginTop: 65}}>
                        {this.renderPagination()}
                </Pagination>
                </div>
            </div>
         );
    }
}
 
export default AdminOrderCheck;