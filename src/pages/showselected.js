import React, {Component} from 'react'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import { onSearchBoxFalse } from '../Action/searchBox'
import numeral from 'numeral'
import { Divider } from '@material-ui/core';

class ShowSelected extends Component {
    state = {
        detailProdData: []
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
            Axios.get(API_URL + '/product/allproduct')
            .then((res) => {
                this.setState({detailProdData: res.data.dataProduct})
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
        console.log(this.props.searchText)
    }

    

    renderSelected = () => {
        return this.state.detailProdData.map((item) => {
            return(
                <div className='card-product d-inline-block mr-1 ml-1'>
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
            </div>
         
        )
    }
}


export default connect(null,{onSearchBoxFalse})(ShowSelected)