import React, { Component } from 'react'
import Slider from 'react-slick'
// import './../../node_modules/slick-carousel/slick/slick.css'
// import './../../node_modules/slick-carousel/slick/slick-theme.css'
import './../../node_modules/slick-carousel/slick/slick.css'
import './../../node_modules/slick-carousel/slick/slick-theme.css'
import Axios from 'axios';


  

class JumbotronSliders extends Component {
    state = {
        data: []
    }
   


    onRenderSlider = () =>{
        console.log(this.state.data)

        var map = this.state.data.map((val) => {
            return(
                <div>
                    <img src={val.img} alt='Gambar' style={{width: 1400, height: 600}} />
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
        </Slider>
            </div>
        )
    }
}

export default JumbotronSliders