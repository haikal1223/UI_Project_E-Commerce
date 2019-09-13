import React, { Component } from 'react'

class Card extends Component {
    render(){
        return (
            <div style={styles.containerStyle}>
                {this.props.children}
            </div>
        )
    }
}

const styles = {
    containerStyle: {
       
    }
}

export default Card

