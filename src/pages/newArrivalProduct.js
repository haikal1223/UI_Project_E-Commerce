import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../API_URL';

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
        return this.state.newArrival.map((item,index) => {
            if(index < 4){

                return(
                    <div className='card-product'>
                        <img src={`${API_URL}${item.image}`} alt={item.image} style={{width:'250px',height:'120px'}} />
                        <p>{item.name}</p>
                        <p className='price'>{item.price}</p>
                        <p>{item.description}</p>
                        <p>{item.stock}</p>
                        <p>{item.category}</p>
                        <p>{item.brand}</p>
                        <a href={`/productdetail?id=${item.id}`}>
                        <p><button>PRODUCT DETAIL</button></p>
                        </a>
                    </div>
                           
                )
            }
        })
    }


    render() { 
        // console.log(this.renderNewArrival())
        return ( 
            <div style={{marginTop: 350}} className='container'>
                <div className='row'>
                {this.renderNewArrival()}
                </div>
            </div>
         );
    }
}
 
export default newArrivalProducts;