import React, { Component } from 'react'

class CardSection extends Component {
    render() {
        return (
            <div style={styles.containerStyle}>
                {this.props.children}
            </div>
        )
    }
}

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export default CardSection