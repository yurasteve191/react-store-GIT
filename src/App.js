import './App.css';

import { setState, useState, useEffect } from 'react';
import MainPage from './components/page_main/mainPage';
import BasketPage from './components/page_basket/basketPage';
import SideBar from './components/sideBar/js/sideBar';
import PageShop from './components/page_shop/pageShop';
import LoginRegister from './components/loginRegister/js/loginRegister';
import BigCart from './components/bigGoodCart/cart/js/cart';
import SideBarButton from './components/sideBar/sideBarButton/js/sideBarButton';

function App(props) {
	//get
	const { functions, variables } = props;
	const { buyerObj, shopObj } = variables;
	// buyerObj.checkIsBuyerIsLogined();

	let [update, setUpdate] = useState(false);
	const globalUpdate = () => {
		async function shopUpdateProcess() {
			await shopObj.updateData(buyerObj.buyerSecretKey);
		}
		async function buyerCheckProcess() {
			await buyerObj.checkIsBuyerIsLogined();
			if (buyerObj.isBuyerLogin) {
				await buyerObj.getUserData();
				await shopUpdateProcess();
			}
			setUpdate(!update);
		}
		buyerCheckProcess();
		shopUpdateProcess();
	};

	useEffect(() => {
		globalUpdate();
	}, []);

	console.log('--> GLOBAL UPDATE <--');

	const [currentPage, setCurrentPage] = useState(0);

	const [fullGoodData, setFullGoodData] = useState(null);
	const [showFullGoodWindow, setShowFullGoodWindow] = useState(false);
	const openFullGoodWindow = (fullGoodData) => {
		setFullGoodData(fullGoodData);
		setShowFullGoodWindow(true);
	};

	const [showLoginRegisterWindow, setShowLoginRegisterWindow] = useState(false);

	return (
		<div className="AppBackground">
			<div className="App">
				{!buyerObj.isBuyerLogin && (
					<div className="userMastLoginContainer">
						<h1><span className='fa fa-rocket'></span></h1>
						<h3>To use this site, you will have to create an account or log in.</h3>
						<h1><span className='fa fa-angle-double-down'></span></h1>
						<SideBarButton functions={{showLoginRegisterWindow:setShowLoginRegisterWindow}} variables={{buttonType: 'loginRegisterBtn'}}/>
					</div>
				)}
				{buyerObj.isBuyerLogin && (
					<>
						<SideBar
							variables={{ buyerObj: buyerObj, defaultPage: currentPage }}
							functions={{
								globalUpdate: globalUpdate,
								showLoginRegisterWindow: (status) => {
									setShowLoginRegisterWindow(status);
								},
								changeCurrentPage: (pageNum) => {
									setCurrentPage(pageNum);
								},
							}}
						/>
						{currentPage === 0 && (
							<MainPage
								functions={{ globalUpdate: globalUpdate, openFullGoodWindow: openFullGoodWindow }}
								variables={{ update, shopObj: shopObj, buyerObj: buyerObj }}
							/>
						)}
						{currentPage === 1 && (
							<PageShop
								functions={{
									globalUpdate: globalUpdate,
									openFullGoodWindow: openFullGoodWindow,
									showFullGoodWindow: (status) => {
										setShowFullGoodWindow(status);
									},
								}}
								variables={{ update, shopObj: shopObj, buyerObj: buyerObj }}
							/>
						)}
						{currentPage === 2 && (
							<BasketPage
								functions={{
									globalUpdate: globalUpdate,
									openFullGoodWindow: openFullGoodWindow,
									showFullGoodWindow: (status) => {
										setShowFullGoodWindow(status);
									},
								}}
								variables={{ update, shopObj: shopObj, buyerObj: buyerObj }}
							/>
						)}
						{showFullGoodWindow && (
							<BigCart
								functions={{
									globalUpdate: globalUpdate,
									showFullGoodWindow: (status) => {
										setShowFullGoodWindow(status);
									},
								}}
								variables={{ buyerObj: buyerObj, fullGoodData: fullGoodData }}
							/>
						)}
					</>
				)}

				{showLoginRegisterWindow && (
					<LoginRegister
						functions={{
							globalUpdate: globalUpdate,
							showLoginRegisterWindow: (status) => {
								setShowLoginRegisterWindow(status);
							},
						}}
						variables={{}}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
