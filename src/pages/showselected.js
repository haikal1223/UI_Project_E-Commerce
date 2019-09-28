import React, {Component} from 'react'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import { onSearchBoxFalse } from '../Action/searchBox'
import numeral from 'numeral'
import { Divider } from '@material-ui/core';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap'
import {Search} from '@material-ui/icons'


class ShowSelected extends Component {
    state = {
        detailProdData: [],
        totalPages: 0,
        pages: 0,
        currPages: 1,
        totalPagesCat: 0,
        pagesCat: 0
    }
    componentDidMount() {
        var id = this.props.location.search.split('=')[1]
        var param = this.props.location.search.split('=')[0]
        console.log(this.props.location.search)
        if(param === '?brand'){
            Axios.get(API_URL + '/brand/getspecifiedbrand/' + id )
            .then((res) => {
                this.setState({detailProdData: res.data})
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }else if (param === '?category'){
            const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
            Axios.get(`${API_URL}/category/getspesificcategories/${id}?${page}` )
            .then((res) => {
                this.setState({detailProdData: res.data.dataProduct,totalPagesCat: res.data.totalPagesCat, pagesCat: res.data.pagesCat})
            })
            .catch((err)=>{
                console.log(err);
                
            })

        } else if(param === '?showsearched'){
            Axios.get(API_URL + `/search/getsearched?search=${this.props.location.search.split('=')[1]}` )
            .then((res) => {
                this.setState({detailProdData: res.data})

            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
        else{
            const page = this.props.location.search.split('=')[1] ? this.props.location.search.split('=')[1]: 1
            Axios.get(API_URL + '/product/allproduct?page=' + page)
            .then((res) => {
                this.setState({detailProdData: res.data.dataProduct, totalPages: res.data.totalPages, pages: res.data.pages})
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
        console.log(this.props.searchText)
    }

    
    renderPagination = () => {
        let totalButton = []
        let listData = this.state.totalPages
        let totalPages = Math.ceil(listData / 6)
        for(var i = 1; i <= totalPages; i++){
            totalButton.push(<PaginationItem className='mr-2'>
                                <PaginationLink href={'showcase?page=' + (i)}>
                                    {i}
                                </PaginationLink>
                            </PaginationItem>)
                            console.log(i)
        }
        console.log(totalPages)
        console.log(totalButton)
        return totalButton
    }

    renderPaginationCategories = () => {
        var id = this.props.location.search.split('=')[1]        
        let totalButton = []
        let listData = this.state.totalPagesCat
        let totalPages = Math.ceil(listData / 6)
        for(var i = 1; i <= totalPages; i++){
            totalButton.push(<PaginationItem className='mr-2'>
                                <PaginationLink href={'showcase?category=' + id + '&page=' +(i)}>
                                    {i}
                                </PaginationLink>
                            </PaginationItem>)
                            console.log(i)
        }
        console.log(totalPages)
        console.log(totalButton)
        return totalButton
    }


    renderSelected = () => {
        
        return this.state.detailProdData.map((item,index) => {
                return(
                    <div className="product ml-4">
        <div className="product-img">
          <img src={`${API_URL}${item.image}`} alt="" style={{width:'250px',height:'200px'}}/>
          <div className="product-label">
              {item.discount >0 ?  <span className="sale">-{item.discount}%</span>: null}
            <span className="new">NEW</span>
          </div>
        </div>
        <div className="product-body">
          <p className="product-category">{item.category}</p>
          <h3 className="product-name"><a href={`/productdetail?id=${item.id}`}>{item.name}</a></h3>
          {item.discount === 0 ?  <h4 className="product-price">{`Rp.${numeral(item.price).format('0,0')}`} </h4>: 
         <h4 className="product-price">{`Rp.${numeral(item.price-(item.price * (item.discount/100))).format('0,0')}`} <del className="product-old-price">{`Rp.${numeral(item.price).format('0,0')}`}</del></h4> }
          <div className="product-btns">
          </div>
        </div>
        <div className="add-to-cart">
         <a href={`/productdetail?id=${item.id}`}><button className="add-to-cart-btn"><Search/>Details</button></a> 
        </div>
      </div>
                           
                )
        })
    }

    render() {
        return (
            <div style={{marginTop: 70}} className='container'>
                <h1>SHOWCASE</h1>
                <Divider/>
            <div style={{marginTop: 20  }} className='container'>
                <div className='row'>
                        {this.renderSelected()} 
                </div>
            </div>
            <div className='mt-2'>
                <Pagination
                    className='mt-4' aria-label="Page navigation example">
                        {this.renderPagination()}
                        {this.renderPaginationCategories()}
                </Pagination>
            </div>
            </div>
         
        )
    }
}


export default connect(null,{onSearchBoxFalse})(ShowSelected)