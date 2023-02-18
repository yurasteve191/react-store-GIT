import '../css/cart.css';

function SmallGoodCart(props) {
  //get
  const {functions, variables} = props
  const {openFullGoodWindow} = functions
  const {fullGoodData} = variables
  
  return (
    <div id={fullGoodData.id} name="small-good-cart" className="sgc-cart" onClick={()=>{openFullGoodWindow(fullGoodData)}}>
        <header>
          <img src= {`${fullGoodData.goodImages[0].goodImage}`} alt='' className='sgc-img'></img>
        </header>
        <footer>
          <div className='sgc-info'>
            <h3>{fullGoodData.goodTitle}</h3>
            <h3>{fullGoodData.goodPrice}$</h3>
          </div>
        </footer>
    </div>
  )
}

export default SmallGoodCart;