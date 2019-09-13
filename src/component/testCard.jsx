import React, { Component } from 'react'

class TestCard extends Component { 
    render() {
        return (
            <div className="card-product" style={{marginTop:80}}>
  <img src="https://static.bhphoto.com/images/images2500x2500/1529950038_1418026.jpg" alt="Denim Jeans" style={{height: '250px'}} />
  <h1>Logitech G102</h1>
  <p class="price">$19.99</p>
  <p>Some text about the jeans..</p>
  <p><button>Add to Cart</button></p>
</div>
        )
    }
}

export default TestCard