import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect  } from 'react-redux'
import { onBtnAddToCart } from '../Action/cartAction'
import numeral from 'numeral' 
import { Divider } from '@material-ui/core';
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {Search, ArrowForward} from '@material-ui/icons'
import { Alert } from 'reactstrap'

class ProductDetail extends Component {

    state = {  
        productDetail: [],
        error: '',
        qty: 0,
        randomProduct: []
    }

    componentDidMount() {
        console.log(this.props.location)
        var id = this.props.location.search.split('=')[1]

        Axios.get(`${API_URL}/product/productdetail/${id}`)
        .then((res) => {
            this.setState({productDetail: res.data})
            console.log(this.state.productDetail)
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(`${API_URL}/product/randomproduct`)
        .then((res) => {
            this.setState({randomProduct: res.data})
        })
        .catch((err) => {
            console.log(err)
        })

    }

    // ================================= ADD TO CART START =============================================
            onBtnAddToCart = (id,price, discount) => {
                console.log('dibawah ini this.props.username')
                console.log(this.props.username)
                if(discount !== 0){
                    price = price - (price * (discount / 100))
                }

                

                if(this.props.roleid === 1){
                    this.setState({error:"Admin can't buy the Items !!!"})
                }

                if(Number(this.state.qty) === 0 || Number(this.state.qty <= 0)){
                    this.setState({error:'Please fill the qty correctly !'})
                }else{
                    var data = {
                        productid: id,
                        price,
                        qty: Number(this.state.qty),
                        username: this.props.username
                    }
    
                    const token = localStorage.getItem('username')
                    var headers = {
                        headers : 
                        {   'Authorization' : `Bearer ${token}`
                        },
                        
                    }
    
                    Axios.post(`${API_URL}/cart/addcart`,{data}, headers)
                    .then((res) =>{
                        let obj = {
                            cart: res.data.cartUser,
                            cartCount: res.data.cartCount
                        }
                        this.props.onBtnAddToCart(obj)
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                }
            }
    // ================================= ADD TO CART END ================================================

    // ================================= RENDER SELECTED START ==========================================
        renderProductDetail = () => {
            return this.state.productDetail.map((item) => {
                return <div className='row' style={{marginTop: 120}}>
                <div className='col-md-3'  >
                        <div className='card-product'>
                        <img src={API_URL + item.image} alt='test' style={{width: '250px', height: '350px'}} />
                        </div>
                </div>
                <div className='col-md-1'>

                </div>
                <div className='col-md-8' >
                    <div>
                    <h1>{item.name}</h1>
                    </div>

                    <div>
                        {item.discount === 0 ?
                    <h1 className=''>{`Rp. ${numeral(item.price).format('0,0')}`}</h1>
                    : <div>
                        <h1><strike>{`Rp.${numeral(item.price).format('0,0')}`}</strike></h1>
                        <h1 className='text-warning'>{`Rp. ${numeral(item.price-(item.price * (item.discount/100))).format('0,0')}`}</h1>
                    </div>
                }

                    </div>
                    <div>
                    <h3>Category: {item.category}</h3>

                    </div>
                    <div>
                    <h3>Brand: {item.brand}</h3>

                    </div>
                    <div>
                    <h3>Available Stock : {item.stock}</h3>

                    </div>
                    <Divider/>
                    <div>
                       <h3>Description: {item.description}</h3> 
                    </div>
                    <div className='d-flex flex-row'>
                    <input type='number' placeholder='qty' ref='qty'/>
                    {this.props.roleid !== 1 ? 
                     <input type='button' value='Add To Cart' onClick={() => this.onBtnAddToCart(item.id,item.price, item.discount)} />
                     : null    
                }
                   
                    </div>
                   
                    {
                        this.state.error?
                        <p>{this.state.error}</p>:
                        null

                    }
                </div>
                </div>
            })
        }
    // ================================= RENDER SELECTED ENDS ==========================================

    // ================================= RENDER MODAL START =============================================
        
    // ================================= RENDER MODAL END ===============================================
    // ================================= RENDER NEW PROD DETAIL =========================================
        renderNewProdDetail = () => {
            return this.state.productDetail.map((item) => {
                return (
                    <div>
                    <div id="breadcrumb" className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumb-tree">
                            <li><a href="/">Home</a></li>
                            <li><a href="/showcase">All Products</a></li>
                            <li><a href={`showcase?brand=${item.brandid}`}>{item.brand}</a></li>
                            <li><a href={`showcase?category=${item.categoryid}`}>{item.category}</a></li>
                            <li className="active">{item.name}</li>
                            </ul>
                        </div>
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                    </div>
                      {/* SECTION */}
      <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            {/* Product main img */}
            <div className="col-md-5 col-md-push-2">
              < div id="product-main-img">
                <div className="product-preview">
                  <img src={`${API_URL}${item.image}`} alt="" />
                </div>
               
              </div>
            </div>
            {/* /Product main img */}
            {/* Product details */}
            <div className="col-md-5">
              <div className="product-details">
                <h2 className="product-name">{item.name}</h2>
                <Divider/>
                <div>
                {item.discount === 0 ?
                    <h3 className='product-price'>{`Rp. ${numeral(item.price).format('0,0')}`}</h3>
                    : <h3 className="product-price">{`Rp. ${numeral(item.price-(item.price * (item.discount/100))).format('0,0')}`} <del className="product-old-price">{`Rp.${numeral(item.price).format('0,0')}`}</del></h3>
                }

                  <span className="product-available">In Stock: {item.stock} pcs</span>
                </div>
                <p>{item.description}</p>
                <div className="add-to-cart">
                  <div className="qty-label">
                    Qty
                    <div className="input-number">
                      <input type="number" ref='qty' value={this.state.qty}/>
                      <span className="qty-up" onClick={()=> this.setState({qty: this.state.qty +1})}>+</span>
                      <span className="qty-down"onClick={()=> this.setState({qty: this.state.qty - 1})} >-</span>
                    </div>
                  </div>
                  <button className="add-to-cart-btn" onClick={() => this.onBtnAddToCart(item.id,item.price, item.discount)}><FaShoppingCart style={{paddingRight:2}}/> add to cart</button>
                </div>
                <div>
                    {this.state.error ?  <Alert color="danger">
                        {this.state.error}
                    </Alert>: null}
                </div>
               
                <ul className="product-links">
                  <li>Category:</li>
                  <li><a href={`showcase?category=${item.categoryid}`}>{item.category}</a></li>
                </ul>

                <ul className="product-links">
                  <li>Brand:</li>
                  <li><a href={`showcase?brand=${item.brandid}`}>{item.brand}</a></li>
                </ul>

              </div>
            </div>
            {/* /Product details */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /SECTION */}
                    </div>

                );
            })
        }

    // ================================= RENDER NEW PROD DETAIL END======================================
    // ================================ RENDER RANDOM PRODUCT START =====================================

    renderRandomProd = () => {
        return this.state.randomProduct.map((item,index) => {
            if(index < 4){
                return(
                    <div className="product ml-4">
        <div className="product-img">
          <img src={`${API_URL}${item.image}`} alt="" style={{width:'250px',height:'200px'}}/>
          <div className="product-label">
              {item.discount >0 ?  <span className="sale">-{item.discount}%</span>: null}
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
            }
        })
    }
    // ================================ RENDER RANDOM PRODUCT ENDS ======================================

    
    render() { 
        console.log(this.state.productDetail)
        return ( 
            <div className='container'>
                <div>
                    {this.renderNewProdDetail()}
                </div>
                <div style={{marginBottom:65}}>
                <h2 style={{paddingTop: 25}}>
                        <Link to='/showcase' className='text-dark'>
                            RELATED PRODUCTS
                        </Link>
                    </h2>
                <Divider/>
                    <div  style={{paddingTop: 25}}>
                        <div className='col-md-12'>
                            <div className='row'>
                                {this.renderRandomProd()}
                            </div>
                        </div>
                 </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        username: auth.username,
        roleid: auth.roleid
    }
}

export default connect(mapStateToProps,{onBtnAddToCart})(ProductDetail);