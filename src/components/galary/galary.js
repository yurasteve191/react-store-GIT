import './galary.css'

import { useState, useEffect } from 'react'

function Galary(props){
    const {functions, variables} = props
    // const {} = functions
    const {itemsCount} = variables
    
    const[itemNum, setIterNum] = useState(-1)
    const[glaryBoxOffset, setGlaryBoxOffset] = useState('0px')
    
    const calculateOffsets = (nexItemNum) => {
        const item = document.querySelectorAll('.galaryItem')[nexItemNum]
        const galary = document.querySelector('.galary')
        const glaryBox = document.querySelector('.glaryBox')
        const galaryOffsetLeftCenter = galary.offsetWidth/2
        const glaryBoxOffsetCenter = glaryBox.offsetLeft - galaryOffsetLeftCenter
        const glaryBoxOffsetLeft = glaryBox.offsetLeft
        const itemOffsetLeftCenter = item.offsetLeft + (item.offsetWidth/2)
        return glaryBoxOffsetLeft-(glaryBoxOffsetCenter+itemOffsetLeftCenter)
    }

    const nextItem = (way) => {
        
        if(way === 'back'){
            const nexItemNum = itemNum>0?itemNum-1:(itemsCount-1)
            Array.from(document.querySelectorAll('.galaryItem')).map((el, idx)=>{
                if(idx===nexItemNum)el.classList.add('bigItem')
                else el.classList.remove('bigItem')
            })
            setGlaryBoxOffset(calculateOffsets(nexItemNum))
            setIterNum(nexItemNum)
        }
        if(way === 'forward'){
            const nexItemNum = itemNum<(itemsCount-1)?itemNum+1:0
            Array.from(document.querySelectorAll('.galaryItem')).map((el, idx)=>{
                if(idx===nexItemNum)el.classList.add('bigItem')
                else el.classList.remove('bigItem')
            })
            setGlaryBoxOffset(calculateOffsets(nexItemNum))
            setIterNum(nexItemNum)
        }
    }
    
    useEffect(()=>{
        nextItem('forward')
    },[])

    return (
        <div className='galary'>
            <button className='galaryArrowBck' onClick={()=>{nextItem('back')}}><span className='fa fa-angle-double-left'></span></button>
            <div style={{left:`${glaryBoxOffset}px`}} className='glaryBox'>
                {props.children}
            </div>
            <button className='galaryArrowFwd' onClick={()=>{nextItem('forward')}}><span className='fa fa-angle-double-right'></span></button>
        </div>
    )
}

export default Galary