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
                    <img src='data:image/jpeg;base64,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' alt='gambargan' style={{height: '250px'}} />
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