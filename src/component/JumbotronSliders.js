import React, { Component } from 'react'
import Slider from 'react-slick'
// import './../../node_modules/slick-carousel/slick/slick.css'
// import './../../node_modules/slick-carousel/slick/slick-theme.css'
import './../../node_modules/slick-carousel/slick/slick.css'
import './../../node_modules/slick-carousel/slick/slick-theme.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "light", background: "red", }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
class JumbotronSliders extends Component {

    render() {
        const settings = {
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>,
            autoplay: true
            
            
          };
        return (
            <div className='pt-5'>
        <Slider {...settings}>
          <div>
         <img src={'https://assets2.razerzone.com/images/cynosa-chroma-pro-gallery-2017/CynosaChromaPro_OGimage-1200x630.jpg'} alt='gambar' width={1450} height={600} />
          </div>
          <div>
          <img src={'http://origin-gaming.logitech.com/assets/65280/g613-wireless-mechanical-gaming-keyboard.png'} alt='gambar' width='100%' height={600} />
          </div>
          <div>
          <img src={'https://assets2.razerzone.com/images/cynosa-chroma-pro-gallery-2017/CynosaChromaPro_OGimage-1200x630.jpg'} alt='gambar' width='100%' height={600} />
          </div>
          <div>
          <img src={'https://assets2.razerzone.com/images/cynosa-chroma-pro-gallery-2017/CynosaChromaPro_OGimage-1200x630.jpg'} alt='gambar' width='100%' height={600} />
          </div>
          <div>
          <img src={'https://assets2.razerzone.com/images/cynosa-chroma-pro-gallery-2017/CynosaChromaPro_OGimage-1200x630.jpg'} alt='gambar' width='100%' height={600} />
          </div>
          <div>
          <img src={'https://venturebeat.com/wp-content/uploads/2018/12/gamma-2.jpg?fit=400%2C220&strip=all'} alt='gambar' width='100%' />
          </div>
        </Slider>
            </div>
        )
    }
}

export default JumbotronSliders