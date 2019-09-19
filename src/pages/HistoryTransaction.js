import React, { Component } from 'react';
import {
    Table,
    Modal,
        ModalHeader,
        ModalBody,
} from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'

class HistoryTransaction extends Component {
    state = { 
        transaksi: [],
        transactionId: null,
        modalOpen: false
        
     }

     componentWillReceiveProps(newprops){ // untk dapet global state baru dengan mencheck global state yg lama dengan paramaeter newprops yang ada di komponen willreceiveprops , karena global state nya ga auto render
        if(this.props.username !== newprops.username){
            // console.log(newprops.username)
            Axios.get(`${API_URL}/cart/gettransaction/` + newprops.username)
            .then((res) => {
                
                this.setState({transaksi: res.data})
                console.log(this.state.transaksi)
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

     renderHistory = () => {
        return this.state.transaksi.map((item) => {
            if(item.status === 'Rejected By Admin' || item.status === 'package received'){

            }

        })
     }

    render() { 
        return ( 
            <div style={{marginTop: 70}}>
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
                        </Table>
                    </ModalBody>
                </Modal>
                <Table>
                    <thead>
                        <th>NO</th>
                        <th>TRANSACTION ID</th>
                        <th>DATE</th>
                    </thead>
                    <tbody>

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
export default connect(mapStateToProps)(HistoryTransaction);