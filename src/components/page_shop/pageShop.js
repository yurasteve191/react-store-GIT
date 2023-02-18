import './pageShop.css';
import { useState, useEffect } from 'react';

import timeout from '../../utils/timeOut';

import ShopTopBar from './shopTopBar/js/shopTopBar';

import MainWindowSection from '../mainWindowSection/mainWindowSection';
import GoodsList from '../goodsList/goodList';
import CategoryList from '../categoryList/categoryList'

function PageShop(props) {
	const { functions, variables } = props;
	const { update, buyerObj, shopObj } = variables;
	const { openFullGoodWindow } = functions;

	const [showingGoodStatus, setShowingGoodStatus] = useState('show');
	// const [goodEls, setGoodsEls] = useState([])

	const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
	async function changeCateforyId(id){
		await shopObj.getShopCategoryiesList()
		shopObj.getSubCategories(id-1)
		console.log(shopObj.subCategoriesListObjs);
		setSelectedCategoryId(id);
	}

	const [pageStatus, setPageStatus] = useState('showing');

	useEffect(() => {
		async function showPage() {
			await timeout(100)
			setPageStatus('active')
		}
		showPage()
	}, []);

	return (
		<div className={`pageShop ${pageStatus} ${showingGoodStatus} ${showingGoodStatus === 'loading' ? 'center' : ''} `}>
			{selectedCategoryId > -1 && (
				<ShopTopBar
					variables={{ buyerObj: buyerObj, shopObj: shopObj, subCategorieList: shopObj.subCategoriesListObjs }}
					functions={{ setShowingGoodStatus: setShowingGoodStatus }}
				/>
			)}
			{showingGoodStatus === 'loading' && (
				<div className="loading-icon">
					<span className="fa fa-refresh"></span>
				</div>
			)}
			{showingGoodStatus === 'show' && (
				<>
					{selectedCategoryId > -1 && (
						<MainWindowSection variables={{ title: '', hasTitle: false, hasBackGroundColor: false }}>
							<GoodsList
								functions={{ openFullGoodWindow: openFullGoodWindow }}
								variables={{ update, shopObj: shopObj, insideDataType: 'filteredList' }}
							/>
						</MainWindowSection>
					)}

					{selectedCategoryId <= -1 && (
						<MainWindowSection variables={{ title: '', hasTitle: false, hasBackGroundColor: false }}>
							<CategoryList
								functions={{onClickCategory: changeCateforyId}}
								variables={{ update, shopObj: shopObj }}
							/>
						</MainWindowSection>
					)}
				</>
			)}
		</div>
	);
}

export default PageShop;
