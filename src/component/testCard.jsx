import React, { Component } from 'react'
import numeral from 'numeral'
class TestCard extends Component { 

    state = {
        angka: 0
    }

    onInputAngkaChange = (e) => {
        var data = numeral(e.target.value).format('0,0.0000')
        this.setState({angka: data})
    }

    render() {
        return (
            <div style={{marginTop: 350}}>
                <input type='number' value={this.state.angka} onChange={this.onInputAngkaChange}/>
            </div>
        )
    }
}

export default TestCard