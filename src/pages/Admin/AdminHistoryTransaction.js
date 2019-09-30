import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../../API_URL';
import SideNavbar from './AdminSideBar'
import { Table, 
        Pagination, 
        PaginationItem, 
        PaginationLink } from 'reactstrap'

class AdminHistoryTransaction extends Component {
    state = { 
        transaction : [],
        totalPages: 0,
        pages: 0,
     }

     componentDidMount(){
        const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
        Axios.get(`${API_URL}/cart/gethistorytransactionadmin?page=${page}`)
        .then((res) => {
            console.log(res.data.dataProduct)
            this.setState({transaction: res.data.dataProduct, totalPages: res.data.totalPages, pages: res.data.pages})
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
                                <PaginationLink href={'adminhistorytransaction?page=' + (i)}>
                                    {i}
                                </PaginationLink>
                            </PaginationItem>)
                            console.log(i)
        }
        console.log(totalPages)
        console.log(totalButton)
        return totalButton
    }

    renderTransactionList = () => {
        return this.state.transaction.map((item) => {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.status}</td>
                        <td>
                            <img src={`${API_URL}${item.image_upload}`} alt='gambar' width={100} />
                        </td>
                    </tr>
                )
        })
    }

    render() { 
        return ( 
            <div style={{marginTop: 70}} className='row'>
            <SideNavbar/>
            <div className='container'>
            <Table bordered striped dark>
                <thead>
                    <tr>
                        <th>ID TRANSAKSI</th>
                        <th>USERNAME</th>
                        <th>STATUS</th>
                        <th>IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTransactionList()}
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
 
export default AdminHistoryTransaction;