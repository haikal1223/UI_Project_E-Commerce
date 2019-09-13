import React from 'react';
import Jumbotron from '../component/JumbotronSliders'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Home extends React.Component{
    render(){
        if(this.props.searchBoxTrue){
            return <Redirect to={`/showcase?showsearched=${this.props.searchText}`} />
          }
        return(
            <div className='bg-light'>
                <div>
                <Jumbotron/>
                </div>
                <div>
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