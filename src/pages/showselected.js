import React, {Component} from 'react'
import Axios from 'axios';
import { API_URL } from '../API_URL';

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
        }else{
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
                <div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <p>{item.stock}</p>
                    <p>{item.category}</p>
                    <p>{item.brand}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div style={{marginTop: 350}}>
                {this.renderSelected()}
            </div>
        )
    }
}

export default ShowSelected