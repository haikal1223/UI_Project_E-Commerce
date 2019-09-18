import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect  } from 'react-redux'
import { onBtnAddToCart } from '../Action/cartAction'
import numeral from 'numeral' 
class ProductDetail extends Component {

    state = {  
        productDetail: [],
        error: ''
    }

    componentDidMount() {
        console.log(this.props.location)
        var id = this.props.location.search.split('=')[1]

        Axios.get(`${API_URL}/product/productdetail/${id}`)
        .then((res) => {
            this.setState({productDetail: res.data})
   
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

                if(Number(this.refs.qty.value) === 0){
                    this.setState({error:'HARAP ISI QTY'})
                }
                var data = {
                    productid: id,
                    price,
                    qty: Number(this.refs.qty.value),
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
    // ================================= ADD TO CART END ================================================

    // ================================= RENDER SELECTED START ==========================================
        renderProductDetail = () => {
            return this.state.productDetail.map((item) => {
                return <div className='row' style={{marginTop: 120}}>
                <div className='col-md-4'  >
                        <div className='card-product'>
                        <img src={API_URL + item.image} alt='test' style={{width: '250px', height: '350px'}} />
                        </div>
                </div>
                <div className='col-md-8'>
                    <div>
                    <h1>{item.name}</h1>
                    </div>

                    <div>
                        {item.discount === 0 ?
                    <h1 className=''>{`Rp. ${numeral(item.price).format(0,0)}`}</h1>
                    : <div>
                        <h1><strike>{item.price}</strike></h1>
                        <h1 className='text-warning'>{`Rp. ${numeral(item.price-(item.price * (item.discount/100))).format('0,0.00')}`}</h1>
                    </div>
                }

                    </div>
                    <div>
                    <h1>{item.category}</h1>

                    </div>
                    <div>
                    <h1>{item.brand}</h1>

                    </div>
                    <div>
                    <h1>Available Stock : {item.stock}</h1>

                    </div>
                    <div className='d-flex flex-row'>
                    <input type='number' placeholder='qty' ref='qty'/>
                    <input type='button' value='Add To Cart' onClick={() => this.onBtnAddToCart(item.id,item.price, item.discount)} />
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


    
    render() { 
        console.log(this.state.productDetail)
        return ( 
            <div className='container' style={{backgroundColor:'grey'}}>
                <div>
            {this.renderProductDetail()}
            </div> 
            
            </div>

        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        username: auth.username
    }
}

export default connect(mapStateToProps,{onBtnAddToCart})(ProductDetail);