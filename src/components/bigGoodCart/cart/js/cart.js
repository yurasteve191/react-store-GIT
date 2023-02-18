import "../css/cart.css"

import { useState, useEffect } from "react"
import Button from "../../button/js/button"

function BigCart(props) {
  const { functions, variables } = props
  const { globalUpdate, showFullGoodWindow } = functions
  const { buyerObj, fullGoodData} = variables

  const [elementVisibleStatus, setElementVisibleStatus] = useState('show')
  
  useEffect(()=>{
    async function elementVisionController(){
      if (elementVisibleStatus === "show") {
        setElementVisibleStatus("showing")
        setTimeout(() => {
          setElementVisibleStatus("active")
        }, 10);
      } else {
        setElementVisibleStatus("hiddening")
        setTimeout(() => {
          showFullGoodWindow(false)
        }, 300);
      }
    }
    if(elementVisibleStatus==='show'||elementVisibleStatus==='hidden') elementVisionController();
  },[elementVisibleStatus])

  const [isGoodInBuyerWishList, setIsGoddInBuyerWishList] = useState(fullGoodData.inBuyerFaworite)
  const changeIsGoodInBuyerWishList = () => {
    buyerObj.changeGoodStatus({statusType: 'wish', method: isGoodInBuyerWishList?'remove':'add', goodId: fullGoodData.id})
    globalUpdate()
    setElementVisibleStatus('hidden')
  }
  const [isGoodInBuyerBasketList, setIsGoddInBuyerBaskeList] = useState(fullGoodData.inBuyerBasket)
  const changeIsGoodInBuyerBasketList = () => {
    buyerObj.changeGoodStatus({statusType: 'basket', method: isGoodInBuyerBasketList?'remove':'add', goodId: fullGoodData.id})
    globalUpdate()
    setElementVisibleStatus('hidden')
  }


  

  return (
    <div className={`bgc-cart ${elementVisibleStatus}`}>
      {fullGoodData!==undefined && (
        <article>
        <section className="b-sect"></section>
        <section className="f-sect">
          <h1>{fullGoodData.goodTitle}</h1>
          <h2>${fullGoodData.goodPrice}</h2>
          <h3>{fullGoodData.goodDesctiption}</h3>
          <section className="btn-sec">
            <Button variables={{role: "shop-btn", isGoodInBuyerBasketList: isGoodInBuyerBasketList }} functions={{changeIsGoodInBuyerBasketList:changeIsGoodInBuyerBasketList}}/>
            <Button variables={{role: "favorite-btn", isGoodInBuyerWishList: isGoodInBuyerWishList}} functions={{changeIsGoodInBuyerWishList:changeIsGoodInBuyerWishList}} />
          </section>
        </section>
          <img src={`${fullGoodData.goodImages[0].goodImage}`} alt='' className='bgc-img'/>
        <button className="close-btn" onClick={()=>{setElementVisibleStatus('hidden')}}><span className="fa fa-remove"></span></button>
      </article>
      )}
    </div>
  )
}

export default BigCart
