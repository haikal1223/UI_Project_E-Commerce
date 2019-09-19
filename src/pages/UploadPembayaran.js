import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import { 
    Table, 
    CustomInput,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    } from 'reactstrap'

class UploadPembayaran extends Component {
    state = { 
        transaksi : [],
        imageFile : undefined,
        imageFileName: 'Select Image...',
        idtransaction: 0,
        transactionDetail : [],
        modalOpen: false,
        transactionId: null
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
            console.log('ini get detail')
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
     }

     // ================================= UPLOAD IMAGE ===============================================
     onAddImageFileChange = (event) =>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0]);
        var file = event.target.files[0]
      
        if (file) {
            this.setState({imageFileName :file.name, imageFile: file })
        }else{
            this.setState({imageFileName : 'Select Image...', imageFile: undefined})
        }
    }

    onBtnSendImage = (id) => {
        if(this.state.imageFile){
            var formData = new FormData()
        const token = localStorage.getItem('username')
            var headers = {
                headers : 
                {   
                    'Content-Type': 'multipart/form-data'
                },
                
            }

            

            // append mirip push di array
            formData.append('image_upload', this.state.imageFile)//logo harus sama kaya di backend

            Axios.post(API_URL + '/transaction/uploadimage/' + id,formData,headers)
            .then((res)=>{
                 Axios.get(`${API_URL}/cart/gettransaction/` + this.props.username)
                 .then((res) => {
                     
                     this.setState({transaksi: res.data,imageFileName: 'Select Image...',imageFile:undefined})
                   
                 })
                 .catch((err) => {
                     console.log(err)
                 })
                
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
    }

    //  ==============================================================================================
    
    // =================================== BUTTON START ==============================================
        onBtnPackageReceived = (id) => {
            Axios.put(`${API_URL}/transaction/packagereceived/${id}`)
            .then((res) => {
                Axios.get(`${API_URL}/cart/gettransaction/` + this.props.username)
                .then((res) => {
                    
                    this.setState({transaksi: res.data,imageFileName: 'Select Image...',imageFile:undefined})
                  
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }

    // ===============================================================================================

    // ================================= MODAL PROD DETAIL ==========================================
        renderModal = () => {
            if(this.state.transactionId && this.state.transactionDetail.length !== 0){
                var jsx = this.state.transactionDetail.map((item, i) => {
                        return (
                            <tr>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.harga}</td>
                                <td>{item.qty}</td>
                                
                            </tr>
                        )
                })
                return jsx
            }
        }
    // ===========================================================================

    renderTransaksi = () => {
       return this.state.transaksi.map((item) => {
        //    IF PERTAMA UNTUK UPLOAD
           if(this.state.idtransaction === item.id) {
            return (
                <tr>
                <td>{item.id}</td>
                <td>
                    
                    {
                        item.status ==='waitingConfirmation'
                         ?
                        <p>Tunggu Konfirmasi Dari Admin</p>
                        :
                        item.status === 'accepted by admin' 
                        ?
                        <CustomInput type='file' label={this.state.imageFileName}  onChange={this.onAddImageFileChange} onClick={() => this.setState({idtransaction: item.id})}/>
                        :
                        null
                    }
                </td>
            <td>{item.status.toUpperCase()}</td>
            <td>
                 {this.state.imageFile ?
                    <input type='button' className='btn btn-success' onClick={() => this.onBtnSendImage(item.id)} value='SEND'/>
                    : null}
            </td>
        </tr>
            )   
           };

        //    IF KEDUA UNTUK SETELAH DI UPLOAD
           if(item.status !== 'Rejected By Admin'){ //jika kondisi tidak di rejected oleh admin
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
                               item.status === 'accepted by admin' && !this.state.imageFile ?
                               <CustomInput type='file'  onChange={this.onAddImageFileChange} onClick={() => this.setState({idtransaction: item.id})}/>
                               : null
                            }
                            {
                                item.status === 'package received' ?
                                <p> Thanks for shoping </p> :null
                            }         
                            {
                                item.status === 'package delivered' ?
                                <div>
                                   
                                <p>Package it's on the way</p>
                                </div>
                                : null
                            }
                   </td>
                 
                   <td>{item.status.toUpperCase()}</td>
                   <td>
                    {item.status === 'package delivered' ?
                      <div>
                      <input type='button' className='btn btn-success' value='PACKAGE RECEIVED'  onClick={() => this.onBtnPackageReceived(item.id)}/>
                      </div>
                        : null}
                    {
                        item.status === 'accepted by admin' || item.status === 'package received' || item.status === 'image being checked' || item.status === 'waitingConfirmation' ?
                        <input type='button' className='btn btn-success' value='DETAILS' onClick={() => this.getDetail(item.id)} /> :
                        null
                    }
                   </td>
               </tr>
           )
        }
       })
    }

// =========================================================================================


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
                        </Table>
                    </ModalBody>
                 

                </Modal>
                <Table bordered striped dark>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>BUKTI PEMBAYARAN</th>
                            <th> STATUS </th>
                            <th>ACTION</th>
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