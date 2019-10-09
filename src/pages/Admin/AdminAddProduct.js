import React, { Component } from 'react'
import { 
    Table, 
    Button, 
    CustomInput,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Pagination, PaginationItem, PaginationLink
    } from 'reactstrap'
import Axios from 'axios';
import SideNavBar from './AdminSideBar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { API_URL } from '../../API_URL';
import numeral from 'numeral'

class AdminAddProduct extends Component {
    state = {
        listProduct : [],
        listBrand: [],
        listCategory: [],
        // state add
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        nameAdd : '',
        priceAdd:undefined,
        descAdd:'',
        stockAdd:undefined,
        discountAdd:undefined,
        selectBrand: 0,
        selectCategory: 0,
        // state edit
        selectedEditPostId : 0,
        editImageFileName : 'Select Image...',
        editImageFile : undefined,
        nameEdit : '',
        priceEdit: undefined,
        descEdit: '',
        stockEdit: undefined,
        discountEdit: undefined,
        selectCategoryEdit: 0,
        selectBrandEdit:0,
        modalOpen: false,
        categoryName: 'CATEGORY',
        brandName: 'BRAND',
        totalPages: 0,
        pages: 0,
        currPages: 1
    }


    componentDidMount() {
        const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
        console.log(page)
        Axios.get(`http://localhost:1999/product/allproduct?page=` + page)
        .then((res) => {
            this.setState({listProduct: res.data.dataProduct, totalPages: res.data.totalPages, pages: res.data.pages})
            console.log(this.props.location)

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

// ========================== RENDER PAGINATION =============================

renderPagination = () => {
    let totalButton = []
    let listData = this.state.totalPages
    let totalPages = Math.ceil(listData / 6)
    for(var i = 1; i <= totalPages; i++){
        totalButton.push(<PaginationItem className='mr-2'>
                            <PaginationLink href={'admin?page=' + (i)}>
                                {i}
                            </PaginationLink>
                        </PaginationItem>)
                        console.log(i)
    }
    console.log(totalPages)
    console.log(totalButton)
    return totalButton
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
                const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
                console.log(page)
                Axios.get(`http://localhost:1999/product/allproduct?page=` + page)
                .then((res) => {
                    this.setState({listProduct: res.data.dataProduct, totalPages: res.data.totalPages, pages: res.data.pages})
                    console.log(this.props.location)
        
                })
                .catch((err) => {
                    console.log(err)
                })
                 this.setState({addImageFileName: 'Select Image...', nameAdd : '', modalOpen:false})
                
                
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
    }

    
// ==================================== ADD SECTION END ==============================================
// ==================================== EDIT SECTION START ===========================================
    onEditImageFileChange = (event) => {
        if(event.target.files[0]){
            this.setState({editImageFileName : event.target.files[0].name, editImageFile : event.target.files[0]})
        }
        else{
            this.setState({editImageFileName : 'Select Image...', editImageFile: undefined})
        }
    }

    onNameEditChange = (event) => {
        if (event.target.value.length <= 100 ){
            this.setState({nameEdit: event.target.value})
        }
    }

    onPriceEditChange = (event) => {
        if (event.target.value.length <= 100 ){
            this.setState({priceEdit: event.target.value})
        }
    }

    onDiscountEditChange = (e) => {
        console.log(e.target.value)
        this.setState({discountEdit: e.target.value})
    }

    onDescEditChange = (e) => {
        console.log(e.target.value)
        this.setState({descEdit: e.target.value})
    }

    onStockEditChange = (e) => {
        console.log(e.target.value)
        this.setState({stockEdit: e.target.value})
    }

    onSelectCategoryEditChange = (e) => {
        console.log(e.target.value)
        this.setState({selectCategoryEdit: e.target.value})
    }

    onSelectBrandEditChange = (e) => {
        console.log(e.target.value)
        this.setState({selectBrandEdit: e.target.value})
    }

    onBtnUpdatePostClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers:
            {   
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            name : this.state.nameEdit,
            price: this.state.priceEdit,
            description: this.state.descEdit,
            discount:this.state.discountEdit,
            stock:this.state.stockEdit,
            categoryid: this.state.selectCategoryEdit,
            brandid: this.state.selectBrandEdit

        }

        formData.append('image',this.state.editImageFile)
        formData.append('data',JSON.stringify(data))

        Axios.put(API_URL + "/product/editproduct/" + id, formData,headers)
        .then((res)=>{
            this.setState({listProduct : res.data,selectedEditPostId : 0, editImageFileName : 'Select Image...'})
            Axios.get(`http://localhost:1999/product/allproduct`)
            .then((res) => {
                this.setState({listProduct: res.data.dataProduct})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }



// ==================================== EDIT SECTION END =============================================
// ==================================== DELETE SECTION START =========================================
    onBtnDeleteClick = (id) => {
        Axios.put(`${API_URL}/product/deleteproduct/${id}`)
        .then((res) => {
            Axios.get(`${API_URL}/product/allproduct`)
            .then((res)=>{
           
           this.setState({listProduct : res.data.dataProduct})
           })
           .catch((err) => {
                console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

// ==================================== DELETE SECTIEN ENDS ==========================================

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
        if(this.state.listProduct){

            return this.state.listProduct.map((val,i) => {
                if(val.id !== this.state.selectedEditPostId){
                    return (
                        <tr key={val.id}>
                            <td>{i+1}</td>
                            <td>{val.name}</td>
                            <td>{`Rp.${numeral(val.price).format('0,0.00')}`}</td>
                            <td>{val.discount} %</td>
                            <td>{val.description.split(' ').map((item,index) => { if(index < 6) return item }).join(' ')}</td>
                            <td>{val.category}</td>
                            <td>{val.brand}</td>
                            <td>
                            <img src={`${API_URL + val.image}`} alt={val.image} width={100} />
                            </td>
                            <td>{val.stock}</td>
                            <td><Button color='primary'  
                                onClick={()=> this.setState({
                                selectedEditPostId : val.id,
                                nameEdit:val.name,
                                priceEdit: val.price,
                                discountEdit: val.discount,
                                descEdit: val.description,
                                stockEdit:val.stock,
                                })} >EDIT</Button> 
                            </td>
                            <td>
                                <Button color='danger' value='DELETE' onClick={() => this.onBtnDeleteClick(val.id)} > DELETE </Button>
                            </td>
                            
                        </tr>
                    )
                }
                return <tr key={val.id}>
                    <td>{i+1}</td>
                    <td>
                        <input type='text' value={this.state.nameEdit} onChange={this.onNameEditChange} />
                    </td>
                    <td>
                        <input type='number' value={this.state.priceEdit} onChange={this.onPriceEditChange} />
                    </td>
                    <td>
                        <input type='number' value={this.state.discountEdit} onChange={this.onDiscountEditChange} />
                    </td>
                    <td>
                        <textarea value={this.state.descEdit} onChange={this.onDescEditChange} />
                    </td>
                    <td>
                        <select onChange={this.onSelectCategoryEditChange}>
                            <option>{this.state.categoryName}</option>
                            {this.renderCatList()}
                        </select>
                    </td>
                    <td>
                        <select onChange={this.onSelectBrandEditChange}>
                            <option>{this.state.brandName}</option>
                            {this.renderBrandList()}
                        </select>
                    </td>
                    <td>
                        <img src={`${API_URL}${val.image}`} alt={val.image} width={100}/>
                        <CustomInput id='editImagePost' type='file' label={this.state.editImageFileName} onChange={this.onEditImageFileChange}  />  
                    </td>
                    <td>
                        <input type='number' value={this.state.stockEdit} onChange={this.onStockEditChange} />
                    </td>
                    <td>
                        <Button color='danger' onClick={()=> this.setState({selectedEditPostId : 0})}>CANCEL</Button>
                    </td>
                    <td>
                        <Button color='success' onClick={()=> this.onBtnUpdatePostClick(val.id)}>SAVE</Button>
                    </td>
                    
                </tr>
                
            })
        }
    }
// =================================== RENDER END ==============================================
    render() {
        if(this.props.roleid === 2){
            return (
         <Redirect to='/' />

            )

        }
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
                                 <th>DISCOUNT</th>
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
                     <Pagination
                    className='mt-4' aria-label="Page navigation example">
                                    {this.renderPagination()}
                    </Pagination>
                    </center>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        roleid: state.auth.roleid
    }
}

export default connect (mapStateToProps)(AdminAddProduct)