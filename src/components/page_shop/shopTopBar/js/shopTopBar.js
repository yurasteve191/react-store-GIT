import '../css/shopTopBar.css';
import { useState, useEffect } from 'react';
import SmallGoodCart from '../../../smallGoodCart/cart/js/cart';

function ShopTopBar(props) {
	//get
	const { functions, variables } = props;

	const { setShowingGoodStatus, setGoodsEls } = functions;
	const { buyerObj, shopObj, subCategorieList } = variables;
    console.log('suuuuuuuuuu');
    console.log(shopObj.lastBuyerFilterData.filterSubCategory);
	const [filterSubCategory, setFilterSubCategory] = useState(shopObj.lastBuyerFilterData.filterSubCategory === '' || shopObj.lastBuyerFilterData.filterSubCategory === undefined ? '' : shopObj.lastBuyerFilterData.filterSubCategory);
	const [filterTitle, setFilterTitle] = useState(shopObj.lastBuyerFilterData.filterTitle === '' || shopObj.lastBuyerFilterData.filterTitle === undefined ? '' : shopObj.lastBuyerFilterData.filterTitle);
	const [filterMinPrice, setFilterMinPrice] = useState(shopObj.lastBuyerFilterData.filterMinPrice >= shopObj.lastBuyerFilterData.filterMaxPrice || shopObj.lastBuyerFilterData.filterMinPrice === undefined ? 0 : shopObj.lastBuyerFilterData.filterMinPrice);
	const [filterMaxPrice, setFilterMaxPrice] = useState(shopObj.lastBuyerFilterData.filterMaxPrice < 0 || shopObj.lastBuyerFilterData.filterMaxPrice === undefined ? 0 : shopObj.lastBuyerFilterData.filterMaxPrice);

	async function handleFilterSubmit(event) {
		try {
			event.preventDefault();
		} catch {}

		setShowingGoodStatus('loading');

		setFilterMinPrice(filterMinPrice >= filterMaxPrice || filterMinPrice === undefined ? 0 : filterMinPrice);
		setFilterMaxPrice(filterMaxPrice <= 0 || filterMaxPrice === undefined ? 0 : filterMaxPrice);

		console.log(filterMinPrice, filterMaxPrice, filterSubCategory, filterTitle);
		await shopObj.getBuyerFilteredGoodsList(buyerObj.buyerSecretKey, {
			filterTitle: filterTitle,
			filterSubCategory: filterSubCategory,
			filterMinPrice: filterMinPrice,
			filterMaxPrice: filterMaxPrice <= 0 ? 999999 : filterMaxPrice,
		});
		const goodsEls = shopObj.buyerFilteredGoodsListObjs.map((obj) => {
			return (
				<SmallGoodCart
					functions={{}}
					variables={{ fullGoodData: obj }}
				/>
			);
		});
		// setGoodsEls(goodsEls)
		setShowingGoodStatus('show');
		console.log(goodsEls);
	}

	useEffect(() => {
		handleFilterSubmit();
	}, []);

	return (
		<div className="shopTopBar">
			<form onSubmit={handleFilterSubmit}>
				<input
					onChange={(e) => {
						setFilterTitle(e.target.value);
					}}
					value={filterTitle}
					type="text"
					placeholder="Good name"
				/>
				<select
					value={filterSubCategory}
					onChange={(e) => {
						setFilterSubCategory(e.target.value);
					}}
					name="cubCategory"
				>
					{subCategorieList.map((item) => {
						return <option value={item}>{item}</option>;
					})}
				</select>
				<input
					onChange={(e) => {
						setFilterMinPrice(e.target.value);
					}}
					value={filterMinPrice}
					type="number"
					placeholder="min price"
				/>
				<input
					onChange={(e) => {
						setFilterMaxPrice(e.target.value);
					}}
					value={filterMaxPrice}
					type="number"
					placeholder="max price"
				/>
				<button
					name="submitBtn"
					type="submit"
				>
					Search
				</button>
			</form>
		</div>
	);
}

export default ShopTopBar;
