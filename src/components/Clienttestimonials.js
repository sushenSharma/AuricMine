import React from 'react'
import Mycard from './Mycard'
import './clienttestimonial.css'
export default function Clienttestimonials() {
    let box=document.querySelector('.product-container')
    const btnpressprev =()=>{
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft-width;
    }
    
    const btnpressnext =()=>{
        let width=box.clientWidth;
        box.scrollLeft=box.scrollLeft+width;
    }

  return (
    <div className='product-slider'>

        
        <button className='prebtn' onClick={btnpressprev}><p>&lt;</p></button>
        <button className='postbtn' onClick={btnpressnext}><p>&gt;</p></button>
        

        <div className='product-container'>

            <Mycard cardno='1'/>

            <Mycard cardno='2'/>

            <Mycard cardno='3'/>
            <Mycard cardno='4'/>
            <Mycard cardno='5'/>
            <Mycard cardno='6'/>
            <Mycard cardno='7'/>
            <Mycard cardno='8'/>
            <Mycard cardno='9'/>
            <Mycard cardno='10'/>
            
        </div>

    
    </div>
  )
}
