import React, {Component} from 'react'
import Axios from 'axios';
import { API_URL } from '../API_URL';
import { connect } from 'react-redux'
import { onSearchBoxFalse } from '../Action/searchBox'

class ShowSelected extends Component {
    state = {
        detailProdData: []
    }
    componentDidMount() {
        var id = this.props.location.search.split('=')[1]
        var param = this.props.location.search.split('=')[0]
        console.log(this.props.location.search)
        this.props.onSearchBoxFalse()
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
            Axios.get(API_URL + `/search/getsearched?search=${this.props.searchText}` )
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
                this.setState({detailProdData: res.data})
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
    }

    

    renderSelected = () => {
        return this.state.detailProdData.map((item) => {
            return(
                <div className='card-product'>
                    <img src={`${API_URL}${item.image}`} alt='gambargan' style={{height: '250px'}} />
                    <p>{item.name}</p>
                    <p className='price'>{item.price}</p>
                    <p>{item.description}</p>
                    <p>{item.stock}</p>
                    <p>{item.category}</p>
                    <p>{item.brand}</p>
                    <p><button>Add to Cart</button></p>
                </div>
                       
            )
        })
    }

    render() {
        return (
            <div style={{marginTop: 350}} className='row'>
                <div className='container'>
                {this.renderSelected()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        searchText: state.searchbox.searchtext,
    }
    
}

export default connect(mapStateToProps,{onSearchBoxFalse})(ShowSelected)