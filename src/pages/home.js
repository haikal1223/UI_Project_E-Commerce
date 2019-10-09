import React from 'react';
import Jumbotron from '../component/JumbotronSliders'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { Divider } from '@material-ui/core';
import { Link} from 'react-router-dom'
import numeral from 'numeral'
import {Search, ArrowForward} from '@material-ui/icons'



class Home extends React.Component{
    state ={
        newArrival: [],
        productDiscount: [],
        pages: 0,
        currPage: 1,
        brandLimit: null
    }
    componentDidMount(){

        Axios.get(`${API_URL}/product/recentproduct`)
        .then((res) => {
            this.setState({newArrival: res.data.dataProduct})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(`${API_URL}/brand/getbrandhome`)
        .then((res) => {
            this.setState({brandLimit: res.data})
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(`${API_URL}/product/discountproduct`)
        .then((res) => {
            this.setState({productDiscount: res.data.dataProduct})
        })
        .catch((err) => {
            console.log(err)
        })
        
   

    }

    renderBrandFilter = () => {
        if(this.state.brandLimit){
            return this.state.brandLimit.map((item, index) => {
                if(index < 3){
                    return (
                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                            <div className="shop-img">
                                <img  src={`${API_URL}${item.logo}`} alt="logo" style={{height: '300px', width:'300px'}} />
                            </div>
                            <div className="shop-body">
                                <h3>{item.name.toUpperCase()}<br />Collection</h3>
                                <a href={`showcase?brand=${item.id}`} className="cta-btn">Shop now <ArrowForward/></a>
                            </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }
    
    renderNewArrival = () => {
        return this.state.newArrival.map((item,index) => {
            if(index < 4){
                return(
                    <div className="product ml-4">
        <div className="product-img">
          <img src={`${API_URL}${item.image}`} alt="" style={{width:'250px',height:'200px'}}/>
          <div className="product-label">
              {item.discount >0 ?  <span className="sale">-{item.discount}%</span>: null}
            <span className="new">NEW</span>
          </div>
        </div>
        <div className="product-body" style={{width: '100%', marginLeft: 0}}>
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

    renderDiscountProduct = () => {
        return this.state.productDiscount.map((item,index) => {
            if(index < 4){
                return(
                    <div className="product ml-4">
        <div className="product-img">
          <img src={`${API_URL}${item.image}`} alt="" style={{width:'250px',height:'200px'}}/>
          <div className="product-label">
              {item.discount >0 ?  <span className="sale">-{item.discount}%</span>: null}
            <span className="new">NEW</span>
          </div>
        </div>
        <div className="product-body" style={{width: '100%', marginLeft: 0}}>
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

    render(){
        if(this.props.searchBoxTrue){
            return <Redirect to={`/showcase?showsearched=${this.props.searchText}`} />
          }
        return(
            <div className='bg-light'>
                <div className='container' style={{paddingTop: 50}}>
                    <div className='row'>
                        {this.renderBrandFilter()}
                    </div>
                     
                    <h2>
                        <Link to='/showcase' className='text-dark'>
                            NEW ARRIVAL PRODUCT
                        </Link>
                    </h2>
                <Divider/>
                    <div  style={{paddingTop: 25}}>
                        <div className='col-md-12'>
                            <div className='row'>
                                {this.renderNewArrival()}
                            </div>
                        </div>
                 </div>
                </div>
                <div style={{marginTop:65}}>
                 <Jumbotron/>
                </div>
                <div className='container' style={{marginTop: 35, marginBottom: 65}}>
                    <h2>
                        <Link to='/showcase' className='text-dark'>
                            SALE ITEM
                        </Link>
                    </h2>
                     <Divider/>
                    <div  style={{paddingTop: 25}}>
                        <div className='col-md-12'>
                            <div className='row'>
                                {this.renderDiscountProduct()}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        searchBoxTrue : state.searchbox.status,
        searchText: state.searchbox.searchtext
    }
  }

export default connect(mapStateToProps)(Home)