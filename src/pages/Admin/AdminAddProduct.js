import React, { Component } from 'react'
import { 
    Table, 
    Button, 
    CustomInput,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    } from 'reactstrap'
import Axios from 'axios';
import SideNavBar from './AdminSideBar'
import { API_URL } from '../../API_URL';

class AdminAddProduct extends Component {
    state = {
        listProduct : [],
        listBrand: [],
        listCategory: [],
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        nameAdd : '',
        priceAdd:undefined,
        descAdd:'',
        stockAdd:undefined,
        discountAdd:undefined,
        selectBrand: 0,
        selectCategory: 0,
        selectedEditPostId : 0,
        editImageFileName : 'Select Image...',
        editImageFile : undefined,
        captionEdit : '',
        modalOpen: false,
        categoryName: 'CATEGORY',
        brandName: 'BRAND'
    }


    componentDidMount() {
        Axios.get(`http://localhost:1999/product/allproduct`)
        .then((res) => {
            this.setState({listProduct: res.data})
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(`${API_URL}/brand/getbrand`)
        .then((res) => {
            this.setState({listBrand: res.data})
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(`${API_URL}/category/getcategory`)
        .then((res) => {
            this.setState({listCategory: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }



// ===================================== MODAL SETTINGS ==============================================

    closeModal = () => {
        this.setState({modalOpen:false})
    } 

// ==================================== MODAL SETTINGS END ===========================================


// ==================================== ADD SECTION START ============================================
    onNameAddChange = (e) => {
        if(e.target.value.length <= 100){
            console.log(e.target.value)
            this.setState({nameAdd: e.target.value})
        }
    }

    onPriceAddChange = (e) => {
        console.log(e.target.value)
        this.setState({priceAdd: e.target.value})
    }

    onDiscountAddChange = (e) => {
        console.log(e.target.value)
        this.setState({discountAdd: e.target.value})
    }

    onDescAddChange = (e) => {
        console.log(e.target.value)
        this.setState({descAdd: e.target.value})
    }

    onStockAddChange = (e) => {
        console.log(e.target.value)
        this.setState({stockAdd: e.target.value})
    }

    onAddImageFileChange = (e) => {
        console.log(e.target.files)
        var file = e.target.files[0]

        if(file){
            this.setState({addImageFileName:file.name, addImageFile: file})
        }else{
            this.setState({addImageFileName:'Select Image...', addImageFile: undefined})
        }
    }

    onSelectCategoryAddChange = (e) => {
        console.log(e.target.value)
        this.setState({selectCategory: e.target.value})
    }

    onSelectBrandAddChange = (e) => {
        console.log(e.target.value)
        this.setState({selectBrand: e.target.value})
    }

    onBtnSaveModal = () => {
        if(this.state.addImageFile){
            var formData = new FormData()
        const token = localStorage.getItem('username')
            var headers = {
                headers : 
                {   'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                
            }

            var data = {
                name : this.state.nameAdd,
                price: this.state.priceAdd,
                description: this.state.descAdd,
                discount:this.state.discountAdd,
                stock:this.state.stockAdd,
                categoryid: this.state.selectCategory,
                brandid: this.state.selectBrand
            }

            // append mirip push di array
            formData.append('image', this.state.addImageFile)//image harus sama kaya di backend
            formData.append('data', JSON.stringify(data))

            Axios.post(API_URL + '/product/addproduct',formData,headers)
            .then((res)=>{
                console.log(res.data);
                const token = localStorage.getItem('username')
                var headers = {
                    headers : 
                    {   'Authorization' : `Bearer ${token}`
                    }
                }
                Axios.get(`${API_URL}/product/allproduct`,headers)
                 .then((res)=>{
                
                this.setState({listProduct : res.data})
                })
                 .catch((err)=>{
                console.log(err);
            
                 })
                 this.setState({addImageFileName: 'Select Image...', nameAdd : '', modalOpen:false})
                
                
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
    }

    
// ==================================== ADD SECTION END ==============================================

// ==================================== RENDER ANYTHING START ========================================
        renderBrandList = () => {
            return this.state.listBrand.map((item) => {
                return (
                    <option key={item.id} value={item.id}>
                        {item.name.toUpperCase()}
                    </option>
                )
            })
        }

        renderCatList = () => {
            return this.state.listCategory.map((item) => {
                return (
                    <option key={item.id} value={item.id}>
                        {item.name.toUpperCase()}
                    </option>
                )
            })
        }


// ==================================== RENDER ANYTHING END ===========================================


// ===================================== RENDER START ================================================
    renderListProduct = () => {
        return this.state.listProduct.map((val) => {
                return (
                    <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.price}</td>
                        <td>{val.description}</td>
                        <td>{val.category}</td>
                        <td>{val.brand}</td>
                        <td>
                        <img src={`${API_URL + val.image}`} alt={val.image} width={100} />
                        </td>
                        <td>{val.stock}</td>
                        <td><Button color='primary' > Edit  </Button></td>
                        <td><Button color='danger' > Delete  </Button></td>
                        
                    </tr>
                )
            
        })
    }
// =================================== RENDER END ==============================================
    render() {
        return (
            <div className='row' style={{marginTop: 70}}>
                <SideNavBar/>
                <div className='container '>
                    <center>
                    <h1 className='mb-2'> Add Products </h1>
                     <Table  striped dark bordered>
                         <thead>
                             <tr style={{textAlign:'center'}}>
                                 <th>ID</th>
                                 <th>NAME</th>
                                 <th>PRICE</th>
                                 <th>DESCRIPTION</th>
                                 <th>CATEGORY</th>
                                 <th>BRAND</th>
                                 <th>IMAGE</th>
                                 <th>STOCK</th>
                                 <th colSpan='2'>ACTION</th>
                             </tr>
                         </thead>
                         <tbody>
                        {this.renderListProduct()}
                         </tbody>
                         <tfoot>
                        <tr style={{margin:'auto',display:'block'}}>
                            <input type='button' className='btn btn-success' colSpan='10' value='ADD' onClick={() => this.setState({modalOpen:true})} />
                            {/* MODAL ADD PRODUCT START */}
                            <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} scrollable style={{height:350}}>
                                <ModalHeader style={{margin:'auto', textAlign:'center'}}>
                                    <h3>ADD PRODUCT</h3>
                                </ModalHeader>
                                <ModalBody className='column'>
                                        <input type='text' placeholder='Product Name' className='form-control mt-2' value={this.state.nameAdd} onChange={this.onNameAddChange} />
                                        <input type='number' placeholder='Price' className='form-control mt-2' value={this.state.priceAdd} onChange={this.onPriceAddChange} />
                                        <input type='number' placeholder='Discount' className='form-control mt-2' value={this.state.discountAdd} onChange={this.onDiscountAddChange} />
                                        <textarea placeholder='Description' className='form-control mt-2' value={this.state.descAdd} onChange={this.onDescAddChange} />
                                        <select className='form-control mt-2' onChange={this.onSelectCategoryAddChange}>
                                            <option>{this.state.categoryName}</option>
                                            {this.renderCatList()}
                                        </select>
                                          <select className='form-control mt-2' onChange={this.onSelectBrandAddChange}>
                                            <option>{this.state.brandName}</option>
                                            {this.renderBrandList()}
                                        </select>
                                        <CustomInput type='file' className='form-control mt-2' label={this.state.addImageFileName} onChange={this.onAddImageFileChange} />
                                        <input type='number' placeholder='Stock' className='form-control mt-2' value={this.state.stockAdd} onChange={this.onStockAddChange} />
                                </ModalBody>
                                <ModalFooter>
                                    <input type='button' className='btn btn-success' value='SAVE' onClick={this.onBtnSaveModal}/>
                                    <input type='button' className='btn btn-danger' value='CANCEL' onClick={this.closeModal} />
                                </ModalFooter>
                            </Modal>
                               

                            {/* MODAL ADD PRODUCT ENDS */}
                        </tr>
                         </tfoot>
                     </Table>
                    </center>
                </div>
            </div>
        )
    }
}

export default AdminAddProduct