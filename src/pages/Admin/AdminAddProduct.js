import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';

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
                        
                    </tr>
                )
            
        })
    }

    render() {
        return (
            <div className='container' style={{paddingTop: '80px'}}>
                <div className='text-center mt-5 '>
                    <h1 className='mb-5'> Add Products </h1>
                     <Table  bordered>
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