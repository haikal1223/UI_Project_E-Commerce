import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { Divider } from '@material-ui/core';

class newArrivalProducts extends Component {
    state = { 
        newArrival: []
    }

    componentDidMount(){
        Axios.get(`${API_URL}/product/recentproduct`)
        .then((res) => {
            this.setState({newArrival: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderNewArrival = () => {
        return this.state.newArrival.map((item) => {

                return(
                    <div className='card-product d-inline-block mr-1 ml-1'>
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
            </div>
         );
    }
}
 
export default newArrivalProducts;