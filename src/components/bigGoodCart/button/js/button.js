import '../css/button.css'

function Button(props) {
  const {functions, variables} = props
  const {changeIsGoodInBuyerBasketList, changeIsGoodInBuyerWishList} = functions
  const {role, isGoodInBuyerBasketList, isGoodInBuyerWishList} = variables





  return (
    <>
      {role === 'shop-btn' && !isGoodInBuyerBasketList &&(
        <button onClick={changeIsGoodInBuyerBasketList} className="bgc-button-buy">Add to cart</button>
      ) || 
      role === 'shop-btn' && isGoodInBuyerBasketList &&(
        <button onClick={changeIsGoodInBuyerBasketList} className="bgc-button-buy">Remove</button>
      )}

      {role === 'favorite-btn' && !isGoodInBuyerWishList &&(
        <button onClick={changeIsGoodInBuyerWishList} className="bgc-button-shop"><span className="fa fa-heart-o "></span> Save</button>
      )||
      role === 'favorite-btn' && isGoodInBuyerWishList &&(
        <button onClick={changeIsGoodInBuyerWishList} className="bgc-button-shop"><span className="fa fa-heart "></span> Delete</button>
      )}
    </>
  )
}

export default Button