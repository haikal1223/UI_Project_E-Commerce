import React, {Component} from 'react'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import { onSearchBoxFalse } from '../Action/searchBox'
import numeral from 'numeral'
import { Divider } from '@material-ui/core';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap'

class ShowSelected extends Component {
    state = {
        detailProdData: [],
        totalPages: 0,
        pages: 0,
        currPages: 1
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
            Axios.get(API_URL + '/category/getspesificcategories/' + id )
            .then((res) => {
                this.setState({detailProdData: res.data})
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

    renderSelected = () => {
        return this.state.detailProdData.map((item) => {
            return(
                <div className='card-product d-inline-block mr-3 ml-2'>
                    <div>
                        <img src={`${API_URL}${item.image}`} alt={item.image} style={{width:'250px',height:'120px'}} />
                    </div>
                    <div>
                        <p>{item.name}</p>
                    </div>
                    <div style={{height: '100px'}}>
                        {item.discount === 0 ?
                         <p className='price'>{`Rp.${numeral(item.price).format('0,0.00')}`}</p> :
                         <div>
                             <p className='price'><strike>{`Rp.${numeral(item.price).format('0,0.00')}`}</strike></p>
                             <p className='discount'>{`Rp.${numeral(item.price-item.price * (item.discount/100)).format('0,0.00')}`}</p>
                         </div> }
                       
                    </div>
                    <div>
                        <p>{item.description.substr(0,50)}...</p>
                    </div>
                    <div>
                        <p>{item.category}</p>    
                    </div>
                    <div>
                        <p>{item.brand}</p>
                    </div>
                    <div>
                        <a href={`/productdetail?id=${item.id}`}>
                        <p><button>PRODUCT DETAIL</button></p>
                        </a>
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
                </Pagination>
            </div>
            </div>
         
        )
    }
}


export default connect(null,{onSearchBoxFalse})(ShowSelected)