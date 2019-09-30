import React, { Component } from 'react';
import {
    Table,
    Modal,
        ModalHeader,
        ModalBody,
        Pagination, 
        PaginationItem, 
        PaginationLink
} from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import numeral from 'numeral'

class HistoryTransaction extends Component {
    state = { 
        transaksi: [],
        transactionId: null,
        modalOpen: false,
        idtransaction: 0,        
        transactionDetail : [],
        totalPages: 0,
        pages: 0,
        
     }

     componentWillReceiveProps(newprops){ // untk dapet global state baru dengan mencheck global state yg lama dengan paramaeter newprops yang ada di komponen willreceiveprops , karena global state nya ga auto render
        if(this.props.username !== newprops.username){
            console.log(newprops.username)
            const page = this.props.location.search.split('page=')[1] ? this.props.location.search.split('page=')[1]: 1
            Axios.get(`${API_URL}/cart/gettransaction/${newprops.username}/${page}` )
            .then((res) => {
                
                this.setState({transaksi: res.data.dataProduct,totalPages: res.data.totalPages, pages: res.data.pages})
                console.log(res.data.dataProduct)
            })
            .catch((err) => {
                console.log(err)
            })
        }
     }

     getDetail = (id) => {
        Axios.get(`${API_URL}/cart/gettransactiondetail/${id}`)
        .then((res) => {
            this.setState({transactionDetail: res.data, transactionId: id, modalOpen: true})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
     }

     renderModal = () => {
        if(this.state.transactionId && this.state.transactionDetail.length !== 0){
            var jsx = this.state.transactionDetail.map((item, i) => {
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{item.name}</td>
                            <td>{`Rp.${numeral(item.harga * item.qty).format('0,0')}`}</td>
                            <td>{item.qty}</td>

                        </tr>
                    )
            })
            return jsx
        }
    }

    renderPagination = () => {
        let totalButton = []
        let listData = this.state.totalPages
        let totalPages = Math.ceil(listData / 6)
        for(var i = 1; i <= totalPages; i++){
            totalButton.push(<PaginationItem className='mr-2'>
                                <PaginationLink href={'uploadpayment?page=' + (i)}>
                                    {i}
                                </PaginationLink>
                            </PaginationItem>)
                            console.log(i)
        }
        console.log(totalPages)
        console.log(totalButton)
        return totalButton
    }

     renderHistory = () => {
        return this.state.transaksi.map((item) => {
            if(item.status === 'rejected by admin' || item.status === 'package received'){
                return (
                    <tr>
                    <td>{item.id}</td>
                    <td>
                        {
                            item.status ==='rejected by admin' ?
                            <p>We are really apologize to reject your request</p>:
                            null
                        }
                         {
                             item.status === 'package received' ?
                             <p> Thanks for shoping </p> :null
                         }         
                         
                </td>
              
                <td>{item.status.toUpperCase()}</td>
                <td>
                {
                        item.status === 'rejected by admin' || item.status === 'package received' ?
                        <input type='button' className='btn btn-success' value='DETAILS' onClick={() => this.getDetail(item.id)} /> :
                        null
                    }
                </td>
            </tr>
                )
            }

        })
     }

     renderTotal = () => {
        var total = 0

        this.state.transactionDetail.forEach((item) => {
            total+= + item.harga * item.qty
        })
        return `Rp.${numeral(total).format('0,0')}`
    }

    render() { 
        return ( 
            <div style={{marginTop: 70}} className='container'>
                <Modal isOpen={this.state.modalOpen} toggle={() => this.setState({modalOpen:false})} scrollable style={{height:350}}>
                    <ModalHeader>
                        TRANSACTION DETAIL
                    </ModalHeader>
                    <ModalBody>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>PRODUCTS</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.renderModal()}
                            </tbody>
                            <tfoot>
                            {this.renderTotal()}
                            </tfoot>
                        </Table>
                    </ModalBody>
                </Modal>
                <Table>
                    <thead>
                        <th>NO</th>
                        <th>INFORMATION</th>
                        <th>STATUS</th>
                        <th>DETAIL</th>
                    </thead>
                    <tbody>
                    {this.renderHistory()}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </Table>
                <Pagination
                    aria-label="Page navigation example" style={{marginTop: 65}}>
                        {this.renderPagination()}
                </Pagination>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}
export default connect(mapStateToProps)(HistoryTransaction);