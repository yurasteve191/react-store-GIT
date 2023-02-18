import './goodsList.css'
import { useState, useEffect } from 'react'
import SmallGoodCart from '../smallGoodCart/cart/js/cart'


function GoodsList(props){
    const {functions, variables} = props
    const {onClickOrder, openFullGoodWindow} = functions
    const {update, insideDataType, shopObj} = variables
    const [goodsListEls, setGoodsListEls] = useState([])
    const changeGoodsListEls = () => {
        if(insideDataType === 'topList'){
            setGoodsListEls(shopObj.shopTopListObjs.map((obj)=>{
                return (<SmallGoodCart functions={{openFullGoodWindow:openFullGoodWindow}} variables={{fullGoodData:obj}}/>)
            }))
        }
        if(insideDataType==='wishList'){
            setGoodsListEls(shopObj.buyerWishListObjs.map((obj)=>{
                return (<SmallGoodCart functions={{openFullGoodWindow:openFullGoodWindow}} variables={{fullGoodData:obj}}/>)
            }))
        }
        if(insideDataType==='basketList'){
            setGoodsListEls(shopObj.buyerBasketListObjs.map((obj)=>{
                return (<SmallGoodCart functions={{openFullGoodWindow:openFullGoodWindow}} variables={{fullGoodData:obj}}/>)
            }))
        }
        if(insideDataType==='filteredList'){
            setGoodsListEls(shopObj.buyerFilteredGoodsListObjs.map((obj)=>{
                return (<SmallGoodCart functions={{openFullGoodWindow:openFullGoodWindow}} variables={{fullGoodData:obj}}/>)
            }))
        }
    }

    useEffect(()=>{
        console.log('update!----------');
        changeGoodsListEls()
    },[update])

    return (
        <>
        <div className={`goodList ${goodsListEls.length<6?'center':''}`}>
            {goodsListEls.length>0 && (
                <>
                    {goodsListEls}
                </>
            )}
            {goodsListEls.length<=0 && (
                <h1><span style={{fontSize:'10vw'}} className='fa fa-blind'></span> Nothing to show</h1>
            )}
        </div>
        {insideDataType==='basketList' && (
            <>
                {goodsListEls.length>0 && (
                    <button onClick={onClickOrder} className='orderButton'>order</button>
                )}
            </>
        )}
        </>
    )
}

export default GoodsList