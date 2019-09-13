import React, { Component } from 'react'
import { Table,Button } from 'reactstrap'
import Axios from 'axios';
import SideNavBar from './AdminSideBar'

class AdminAddProduct extends Component {
    state = {
        listPost : [],
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        captionAdd : '',
        selectedEditPostId : 0,
        editImageFileName : 'Select Image...',
        editImageFile : undefined,
        captionEdit : ''
    }


    componentDidMount() {
        Axios.get(`http://localhost:1999/product/allproduct`)
        .then((res) => {
            this.setState({listPost: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

// ===================================== RENDER START ================================================
    renderListProduct = () => {
        return this.state.listPost.map((val) => {
                return (
                    <tr>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.price}</td>
                        <td>{val.description}</td>
                        <td>{val.category}</td>
                        <td>{val.brand}</td>
                        <td>{val.images}</td>
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
                <div className='text-center mt-5 ml-3'>
                    <h1 className='mb-5'> Add Products </h1>
                     <Table  striped bordered>
                         <thead>
                             <tr>
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

                         </tfoot>
                     </Table>
                </div>
            </div>
        )
    }
}

export default AdminAddProduct