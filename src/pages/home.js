import React from 'react';
import Jumbotron from '../component/JumbotronSliders'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { Divider } from '@material-ui/core';
import numeral from 'numeral'



class Home extends React.Component{
    state ={
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
                        <div>
                            <img src={`${API_URL}${item.image}`} alt={item.image} style={{width:'250px',height:'120px'}} />
                        </div>
                        <div>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            {item.discount === 0 ?
                             <p className='price'>{`Rp.${numeral(item.price).format('0,0.00')}`}</p> :
                             <div>
                                 <p className='price'><strike>{`Rp.${numeral(item.price).format('0,0.00')}`}</strike></p>
                                 <p className='discount'>{`Rp.${numeral(item.price-(item.price * (item.discount/100))).format('0,0.00')}`}</p>
                             </div> }
                           
                        </div>
                        <div>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            <p>{item.stock}</p>
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
            }
        })
    }

    render(){
        if(this.props.searchBoxTrue){
            return <Redirect to={`/showcase?showsearched=${this.props.searchText}`} />
          }
        return(
            <div className='bg-light'>
                <div>
                <Jumbotron/>
                </div>
                <div className='container' style={{paddingTop: 50}}>
                <h1>NEW ARRIVAL PRODUCT</h1>
                <Divider/>
                <div  style={{paddingTop: 25}}>
                <div className='row'>
                {this.renderNewArrival()}
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