import '../css/sideBarButton.css'

function SideBarButton(props){
    //get
    const {functions, variables} = props
    const {buttonType, id, title, buttonStatus} = variables
    const {buyerLogOut, showLoginRegisterWindow, changeSideBarButtonStatus} = functions
    
    return (
        <>
            {buttonType === 'menuBtn' && (
                <button className={`sideBarButton ${buttonStatus}`} onClick={()=>{changeSideBarButtonStatus(id)}}>{title}</button>
            )}
            {buttonType === 'loginRegisterBtn' && (
                <button onClick={()=>{showLoginRegisterWindow(true)}} className='sideBarButton lgButton'>login/register</button>
            )}
            {buttonType === 'LogoutBtn' && (
                <button className='sideBarButton lgoutButton' onClick={()=>{buyerLogOut()}}>logout</button>
            )}
        </>
    )
}

export default SideBarButton