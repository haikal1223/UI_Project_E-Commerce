import React from 'react';
import Axios from 'axios';

class Jumbotron extends React.Component{
    state = {
        data : []
    }
    componentDidMount(){
        Axios.get('http://localhost:2001/Product')
        .then((res)=>{
            this.setState({data:res.data})
            console.log(res.data);
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    render(){
        return(
            <div>
                <h1>HELLO WORLD</h1>
            </div>
        )
    }
}

export default Jumbotron