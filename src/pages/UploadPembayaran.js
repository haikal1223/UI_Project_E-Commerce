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
    Pagination, 
    PaginationItem, 
    PaginationLink
    } from 'reactstrap'
import numeral from 'numeral'

class UploadPembayaran extends Component {
    state = { 
        transaksi : [],
        imageFile : undefined,
        imageFileName: 'Select Image...',
        idtransaction: 0,
        transactionDetail : [],
        modalOpen: false,
        transactionId: null,
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
                  const page = this.props.location.search.split('page=')[1] ? this.props.location.search.split('page=')[1]: 1
            Axios.get(`${API_URL}/cart/gettransaction/${this.props.username}/${page}` )
            .then((res) => {
                
                this.setState({transaksi: res.data.dataProduct,totalPages: res.data.totalPages, pages: res.data.pages,
                    imageFileName: 'Select Image...',imageFile:undefined})
                console.log(res.data.dataProduct)
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
                const page = this.props.location.search.split('page=')[1] ? this.props.location.search.split('page=')[1]: 1
                Axios.get(`${API_URL}/cart/gettransaction/${this.props.username}/${page}` )
                .then((res) => {
                    
                    this.setState({transaksi: res.data.dataProduct,totalPages: res.data.totalPages, pages: res.data.pages,
                        imageFileName: 'Select Image...',imageFile:undefined})
                    console.log(res.data.dataProduct)
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
                                <td>{`Rp.${numeral(item.harga * item.qty).format('0,0')}`}</td>
                                <td>{item.qty}</td>

                            </tr>
                        )
                })
                return jsx
            }
        }

        renderTotal = () => {
            var total = 0

            this.state.transactionDetail.forEach((item) => {
                total+= + item.harga * item.qty
            })
            return `Rp.${numeral(total).format('0,0')}`
        }

        renderTotalQty = () => {
            var total = 0

            this.state.transactionDetail.forEach((item) => {
                total+= + item.qty
            })
            return total
        }
    // ===========================================================================

    renderTransaksi = () => {
       return this.state.transaksi.map((item, i) => {
        //    IF PERTAMA UNTUK UPLOAD
           if(this.state.idtransaction === item.id) {
            return (
                <tr>
                <td>{i+1}</td>
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
                       <td>{i+1}</td>
                       <td>
                           {
                               item.status ==='waitingConfirmation' ?
                               <p>Please Wait. Admin is checking your order.</p>:
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
                            {
                                item.status === 'image being checked' ?
                                <p>Your image being checked</p>:
                                null
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
                <Modal isOpen={this.state.modalOpen} className='modal-lg' toggle={() => this.setState({modalOpen:false})} scrollable style={{height:350}}>
                    <ModalHeader>
                        TRANSACTION DETAIL
                    </ModalHeader>
                    <ModalBody>
                        <Table striped dark>
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
                            <tfoot style={{border:'2px'}}>
                                <td></td>
                                <td><b>Total</b></td>
                                <td style={{fontWeight:'bold'}}>
                                {this.renderTotal()}
                                </td>
                                <td style={{fontWeight: 'bold'}}>
                                    {this.renderTotalQty()}
                                </td>
                            </tfoot>
                        </Table>
                    </ModalBody>
                 

                </Modal>
                <Table bordered striped dark>
                    <thead style={{textAlign:'center'}}>
                        <tr>
                            <th>NO</th>
                            <th>INFORMATION</th>
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
 
export default connect(mapStateToProps)(UploadPembayaran);