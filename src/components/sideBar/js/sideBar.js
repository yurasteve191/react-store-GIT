

import { useState } from "react"
import '../css/sideBar.css'
import SideBarButton from '../sideBarButton/js/sideBarButton'


function SideBar(props){
    //get
    const {functions, variables} = props
    const {buyerObj, defaultPage} = variables
    const {globalUpdate, showLoginRegisterWindow, changeCurrentPage} = functions
    
    const sideBarButtonsTitle = [
        'main',
        'shop',
        'basket'
    ]
    // if(buyerObj.isBuyerLogin) sideBarButtonsTitle.push('basket')
    //do
    const buyerLogOut = () => {
        localStorage.removeItem("lbsk-22dj3dj392dj2")
        globalUpdate();
    }
    const [sideBarButtonsVariabels, setSideBarButtonStatuses] = useState(sideBarButtonsTitle.map((el, idx) => {
        if (idx===defaultPage){
            return {
                id: idx,
                buttonType: 'menuBtn',
                title: el,
                buttonStatus: 'active'
            }
        }else{
            return {
                id: idx,
                buttonType: 'menuBtn',
                title: el,
                buttonStatus: 'disactive'
            }
        }
    }))
    const changeSideBarButtonStatus = (id) => {
        changeCurrentPage(id)
        setSideBarButtonStatuses(sideBarButtonsVariabels.map((_, idx) => {
            if (id !== idx) return {...sideBarButtonsVariabels[idx],'buttonStatus': 'disactive'}
            else return {...sideBarButtonsVariabels[idx],'buttonStatus': 'active'}
        })
    )}
    
    //create
    const sideButtonsEls = sideBarButtonsVariabels.map((el, idx) => {
        return(<SideBarButton key={idx} functions={{changeSideBarButtonStatus: changeSideBarButtonStatus}} variables={sideBarButtonsVariabels[idx]}/>)
    })
    //return
    return (
        <div className='mainPageSideBar'>
            {!buyerObj.isBuyerLogin && buyerObj.isBuyerLogin !== 'undefined' && (
                <SideBarButton functions={{showLoginRegisterWindow:showLoginRegisterWindow}} variables={{buttonType: 'loginRegisterBtn'}}/>
            )}
            {sideButtonsEls}
            {buyerObj.isBuyerLogin && buyerObj.isBuyerLogin !== 'undefined' && (
                <SideBarButton functions={{buyerLogOut:buyerLogOut}} variables={{buttonType: 'LogoutBtn'}}/>
            )}
        </div>
    )
}

export default SideBar