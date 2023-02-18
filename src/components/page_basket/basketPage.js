import './basketPage.css'

import { useState, useEffect } from "react"
import timeout from '../../utils/timeOut';
import MainWindowSection from '../mainWindowSection/mainWindowSection';
import GoodsList from '../goodsList/goodList';

function BasketPage(props){
	const { functions, variables } = props;
	const { update, buyerObj, shopObj } = variables;
	const { globalUpdate, openFullGoodWindow } = functions;
    
	// const [showingGoodStatus, setShowingGoodStatus] = useState('show');

	const [pageStatus, setPageStatus] = useState('showing');

	const handleBuyerOrder = () => {
		buyerObj.sendOrder()
		globalUpdate()
	}

	useEffect(() => {
		async function showPage() {
			await timeout(100)
			setPageStatus('active')
		}
		showPage()
	}, []);

    return (
        <div className={`pageBasket ${pageStatus} `}>
			{/* {showingGoodStatus === 'show' && ( */}
                <MainWindowSection variables={{ title: 'Your basket', hasTitle: true, hasBackGroundColor: true }}>
                    <GoodsList
                        functions={{ onClickOrder: handleBuyerOrder, openFullGoodWindow: openFullGoodWindow }}
                        variables={{ update, shopObj: shopObj, insideDataType: 'basketList' }}
                    />
                </MainWindowSection>
			{/* )} */}
		</div>
    )
}

export default BasketPage