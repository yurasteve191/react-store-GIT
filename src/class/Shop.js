class Shop {
  shopTopListObjs = [];
  shopCategoryiesListObjs = [];
  subCategoriesListObjs = [];
  buyerWishListObjs = [];
  buyerBasketListObjs = [];
  buyerFilteredGoodsListObjs = [];

  constructor() {}

  async getBuyerWishList(buyerSecretKey) {
    const response = await fetch(`shop-api/get-buyer-wish-list/?buyerSecretKey=${buyerSecretKey}`);
    const json = await response.json();
    console.log(json);
    if ("result" in json) {
      this.buyerWishListObjs = json.result;
    }
    console.log(this.buyerWishListObjs);
  }
  async getBuyerBasketList(buyerSecretKey) {
    const response = await fetch(`shop-api/get-buyer-basket-list/?buyerSecretKey=${buyerSecretKey}`);
    const json = await response.json();
    if ("result" in json) {
      this.buyerBasketListObjs = json.result;
    }
  }
  async getShopTopList(buyerSecretKey) {
    const response = await fetch(`shop-api/get-shop-top/?buyerSecretKey=${buyerSecretKey}`);
    const json = await response.json();
    if ("result" in json) {
      this.shopTopListObjs = json.result;
    }
  }
  async getShopCategoryiesList(){
    console.log('get cateroryies');
    const response = await fetch(`shop-api/get-shop-categories/`);
    const json = await response.json();
    if ("result" in json) {
      this.shopCategoryiesListObjs = json.result
    }
  }

  getSubCategories(id){
    this.subCategoriesListObjs = this.shopCategoryiesListObjs[id].goodSubCategoryesTitle.map((el)=>{return el.goodSubCategoryTitle})
  }

  lastBuyerFilterData = {}
  //127.0.0.1:8000/shop-api/get-buyer-filtered-goods-list/?buyerSecretKey=m66Rr15Ht19Bf37Ot55Cc12Qx5Jr60Ps3Rb11K&filterCategory=&filterSubCategory=&filterMinPrice=0&filterMaxPrice=9999filterTitle=ip
  async getBuyerFilteredGoodsList(buyerSecretKey, filterData) {
    this.lastBuyerFilterData = filterData
    const { filterSubCategory, filterMinPrice, filterMaxPrice, filterTitle } = filterData;
    console.log(filterSubCategory, filterMinPrice, filterMaxPrice, filterTitle);
    const response = await fetch(`shop-api/get-buyer-filtered-goods-list/?buyerSecretKey=${buyerSecretKey}&filterSubCategory=${filterSubCategory}&filterMinPrice=${filterMinPrice}&filterMaxPrice=${filterMaxPrice}&filterTitle=${filterTitle}`);
    const json = await response.json();
    if ("result" in json) {
      this.buyerFilteredGoodsListObjs = json.result;
    }
  }

  async updateData(buyerSecretKey) {
    if(this.lastBuyerFilterData!=={}) await this.getBuyerFilteredGoodsList(buyerSecretKey,this.lastBuyerFilterData)
    await this.getBuyerBasketList(buyerSecretKey)
    await this.getBuyerWishList(buyerSecretKey)
    await this.getShopTopList(buyerSecretKey)
    await this.getShopCategoryiesList()
    console.log('shop obj update done!');
  }
}
export default Shop;
