import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { Divider } from '@material-ui/core';
import {   Pagination, PaginationItem, PaginationLink } from 'reactstrap'

class newArrivalProducts extends Component {
    state = { 
        newArrival: [],
        totalPages: 0,
        pages: 0,
        currPages: 1
    }

    componentDidMount(){
        const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
        Axios.get(`${API_URL}/product/recentproduct?page=${page}`)
        .then((res) => {
            this.setState({newArrival: res.data.dataProduct, totalPages: res.data.totalPages, pages: res.data.pages})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderNewArrival = () => {
        return this.state.newArrival.map((item) => {

                return(
                    <div className='card-product d-inline-block mr-1 ml-1 mt-2'>
                        <img src={`${API_URL}${item.image}`} alt={item.image} style={{width:'250px',height:'120px'}} />
                        <p>{item.name}</p>
                        <p className='price'>{item.price}</p>           
                        <p>{item.category}</p>
                        <p>{item.brand}</p>
                        <div style={{height: '75px'}}>
                        <p>{item.description.split(' ').map((item,index) => { if(index < 6) return item }).join(' ')}</p>
                        </div>
                        <a href={`/productdetail?id=${item.id}`}>
                        <p><button>PRODUCT DETAIL</button></p>
                        </a>
                    </div>
                           
                )
        })
    }

    renderPagination = () => {
        let totalButton = []
        let listData = this.state.totalPages
        let totalPages = Math.ceil(listData / 6)
        for(var i = 1; i <= totalPages; i++){
            totalButton.push(<PaginationItem className='mr-2'>
                                <PaginationLink href={'newarrivalproducts?page=' + (i)}>
                                    {i}
                                </PaginationLink>
                            </PaginationItem>)
                            console.log(i)
        }
        console.log(totalPages)
        console.log(totalButton)
        return totalButton
    }

    render() { 
        // console.log(this.renderNewArrival())
        return ( 
            <div style={{marginTop: 70}} className='container'>
            <h1>New Arrival Products</h1>
            <Divider/>
            <div className='container' style={{paddingTop: 25}}>
                <div >
                  
                    {this.renderNewArrival()}

                </div>
            </div>
            <Pagination
                    className='mt-4' aria-label="Page navigation example">
                                    {this.renderPagination()}
                    </Pagination>
            </div>
         );
    }
}
 
export default newArrivalProducts;