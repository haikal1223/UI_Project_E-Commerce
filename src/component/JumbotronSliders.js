import React, { Component } from 'react'
import Slider from 'react-slick'
// import './../../node_modules/slick-carousel/slick/slick.css'
// import './../../node_modules/slick-carousel/slick/slick-theme.css'
import './../../node_modules/slick-carousel/slick/slick.css'
import './../../node_modules/slick-carousel/slick/slick-theme.css'
import Axios from 'axios';
import { API_URL } from '../API_URL';


  

class JumbotronSliders extends Component {
    state = {
        data: []
    }
    
    componentDidMount(){
        Axios.get(`${API_URL}/jumboslider/getallsliders`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onRenderSlider = () =>{

        var map = this.state.data.map((val) => {
            return(
                <div>
                    <img src={`${API_URL}${val.image}`} alt='Gambar' style={{width: 1400, height: 600}} />
                </div>
            )
        })
        return map
    }
    render() {
        const settings = {
            infinite: true,
            speed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
            
            
          };
        return (
            <div className='pt-5'>
        <Slider {...settings}>
          {this.onRenderSlider()}
          {/* <div>
                    <img src={'https://mspoweruser.com/wp-content/uploads/2018/11/razer-banner-for-usssss.jpg'} alt='Gambar' style={{width: 1400, height: 600}} />
                </div> */}
        </Slider>
            </div>
        )
    }
}

export default JumbotronSliders