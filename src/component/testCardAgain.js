import React, { Component } from 'react'
import Card from './Card'
import CardSection from './CardSection'

class TestCardAgain extends Component {
    renderCard = () => {
        return (

<div className='mt-5' style={{border: '1px solid red'}}>
        <div style={{width: '280px', height: '280px'}} className='col-md-4'>
         <img src={'https://media.giphy.com/media/tntfKAkzFmeu4/giphy.gif'}
            alt='gadot' />
        </div>
        <div className='col-md-8'>
            <h1>TEST</h1>
        </div>
      
</div>
        )
    }

    render() {
        return (
               <div className='card'>
                   <div className='card-section'>
                   <div >
         <img src={'https://i5.walmartimages.com/asr/2eb80544-5a98-414d-a1da-1e770cb2f7d7_1.5fe18546110436223a5b6b3c710c2b2f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'}
            style={{width: '288px', height: '300px'}}
            alt='mouse' />
        </div>
        <div>
           <h1>TEST</h1>
            <h1>TEEESST</h1>
        </div>
                   </div>

               </div>
        )
    }
}

export default TestCardAgain