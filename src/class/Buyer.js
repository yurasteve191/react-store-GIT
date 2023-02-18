class Buyer{
    isBuyerLogin = false

    buyerSecretKey = ''
    buyerFirstName = ''
    buyerPhone = ''
    buyerEmail = ''

    constructor() {
	}

    async checkIsBuyerIsLogined(){
        const localBuyerSecretKey = localStorage.getItem("lbsk-22dj3dj392dj2")
        if(localBuyerSecretKey  !== null && localBuyerSecretKey  !== 'undefined'){
            this.isBuyerLogin = true
            this.buyerSecretKey = localBuyerSecretKey
            return true
        }else{
            this.isBuyerLogin = false
            this.buyerSecretKey = ''
            return false
        }
    }

    async getUserData(){
        const response = await fetch(`shop-api/get-buyer-data/?buyerSecretKey=${this.buyerSecretKey}`)
        const json = await response.json()
        if ("result" in json){
            this.buyerFirstName  = json.result.buyerFirstName
            this.buyerPhone = json.result.buyerPhone
            this.buyerEmail = json.result.buyerEmail
            return true
        }else if("error" in json){
            console.log(`Server error responce -> ${json.error}`);
            return false
        }
        else{
            console.log('ERROR: cant get buyer data.');
            return false
        }
    }

    async changeGoodStatus({statusType, method, goodId}){
        const url = `shop-api/${method}-good-buyer-${statusType}-list/?buyerSecretKey=${this.buyerSecretKey}&goodId=${goodId}`
        const response = await fetch(url)
        const json = await response.json()
        if ("result" in json){
            return true
        }else if("error" in json){
            console.log(`Server error responce -> ${json.error}`);
            return false
        }
        else{
            console.log('ERROR: cant get buyer data.');
            return false
        }
    }

    async sendOrder(){
        //shop-api/add-new-order/?buyerSecretKey=m66Rr15Ht19Bf37Ot55Cc12Qx5Jr60Ps3Rb11K
        const url = `shop-api/add-new-order/?buyerSecretKey=${this.buyerSecretKey}`
        const response = await fetch(url)
        const json = await response.json()
        if ("result" in json){
            return true
        }else if("error" in json){
            console.log(`Server error responce -> ${json.error}`);
            return false
        }
        else{
            console.log('ERROR: cant send order.');
            return false
        }
    }
}

export default Buyer