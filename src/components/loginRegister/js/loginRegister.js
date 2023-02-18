import '../css/loginRegister.css'
import { useState, useEffect } from "react"
import timeout from "../../../utils/timeOut"

function LoginRegister(props){
    //get
    const {functions, variables} = props
    const {globalUpdate, showLoginRegisterWindow} = functions
    const {} = variables
    //set
    const [elementVisibleStatus, setElementVisibleStatus] = useState("showing")
    const [formStatus, setFormStatus] = useState('waiting')//waiting || pending || done || error
    const [type, setType] = useState('login')//login || register -> str
    const changeType = () => {
        setType((type === 'login')?'register':'login')//login || register -> str
    }

    function SaveBuyerSecretKey(key){
        localStorage.setItem('lbsk-22dj3dj392dj2',key)
    }

    
    useEffect(()=>{
            async function showElement(){
            await timeout(100)
            setElementVisibleStatus('active')
        }
        showElement()
    },[])


    //register values/functions
    const [regBuyerLogin, seRegBuyerLogin] = useState('')
    const [regBuyerFirstName, setRegBuyerFirstName] = useState('')
    const [regBuyerLastName, setRegBuyerLastName] = useState('')
    const [regBuyerPhone, setRegBuyerPhone] = useState('')
    const [regBuyerEmail, setRegBuyerEmail] = useState('')
    const [regBuyerPassword, setRegBuyerPassword] = useState('')

    async function handleRegisterSubmit(event){
        event.preventDefault()
        const response = await fetch(regUrl);
        const result = await response.json()
        if ("result" in result){
            setFormStatus('done')
            setTimeout(() => {
                setFormStatus('waiting')
            }, 1200);
        }else{
            setFormStatus('error')
            setTimeout(() => {
                setFormStatus('waiting')
            }, 1200);
        }
    }
    //login values/functions
    const [logBuyerLogin, seLogBuyerLogin] = useState('')
    const [logBuyerPassword, setLogBuyerPassword] = useState('')

    async function handleLoginSubmit(event){
        event.preventDefault()
        setFormStatus('pending')
        const response = await fetch(logUrl);
        const result = await response.json()
        if ("result" in result){
            setFormStatus('done')
            SaveBuyerSecretKey(result.result)
            setTimeout(() => {
                globalUpdate()
                showLoginRegisterWindow(false)
            }, 1200);
        }else{
            setFormStatus('error')
            setTimeout(() => {
                setFormStatus('waiting')
            }, 1200);
        }
    }
    
    //send urls
    const regUrl = `shop-api/create-buyer/?buyerLogin=${regBuyerLogin}&buyerPassword=${regBuyerPassword}&buyerFirstName=${regBuyerFirstName}&buyerLastName=${regBuyerLastName}&buyerPhone=${regBuyerPhone}&buyerEmail=${regBuyerEmail}`
    const logUrl = `shop-api/login-buyer/?buyerLogin=${logBuyerLogin}&buyerPassword=${logBuyerPassword}`



    return (
        <article id='logRegElId' className={`${type}`}>
            <section className={`${elementVisibleStatus}`}>
                {formStatus==='waiting' && (
                    <>
                        <section className='logRegSec'>
                        {type==='login' && (
                            <>
                                <form onSubmit={handleLoginSubmit}>
                                    <h3>Login</h3>
                                    <input type='text' value={logBuyerLogin} onChange={(e)=>{seLogBuyerLogin(e.target.value)}} placeholder='Login' required></input>
                                    <input type='password' value={logBuyerPassword} onChange={(e)=>{setLogBuyerPassword(e.target.value)}} placeholder='Password' required></input>
                                    <button type='submit'>Login</button>
                                </form>
                            </>
                        )}
                        {type==='register' && (
                            <>
                                <form onSubmit={handleRegisterSubmit}>
                                    <h3>Registration</h3>
                                    <input type='text' value={regBuyerLogin} onChange={(e)=>{seRegBuyerLogin(e.target.value)}} placeholder='Login' required></input>
                                    <input type='text' value={regBuyerFirstName} onChange={(e)=>{setRegBuyerFirstName(e.target.value)}} placeholder='First name' required></input>
                                    <input type='text' value={regBuyerLastName} onChange={(e)=>{setRegBuyerLastName(e.target.value)}} placeholder='Last name' required></input>
                                    <input type='tel' value={regBuyerPhone} onChange={(e)=>{setRegBuyerPhone(e.target.value)}} placeholder='Phone' required></input>
                                    <input type='text' value={regBuyerEmail} onChange={(e)=>{setRegBuyerEmail(e.target.value)}} placeholder='E-mail' required></input>
                                    <input type='password' value={regBuyerPassword} onChange={(e)=>{setRegBuyerPassword(e.target.value)}} placeholder='Password' required></input>
                                    <button type='submit'>Registration</button>
                                </form>
                            </>
                        )}
                        </section>
                        <section className='logRegTitleSec'>
                            {type==='login' && (
                                <>
                                    <h3> <span className='fa fa-pencil-square-o' ></span> Lest create new account!</h3>
                                    <button onClick={()=>{changeType()}}>Registration</button>
                                </>
                            )}
                            {type==='register' && (
                                <>
                                    <h3> <span className='fa fa-rocket' ></span> Lest login!</h3>
                                    <button onClick={()=>{changeType()}}>Login</button>
                                </>
                            )}
                        </section>
                    </>
                )}
                {formStatus==='pending' && (
                    <h3 className='formStatusText a-spin'><span className='fa fa-refresh'></span></h3>
                )}
                {formStatus==='done' && (
                    <h3 className='formStatusText a-show'><span style={{color:'rgba(34,103,195,1)', fontSize: '10vw'}} className='fa fa-thumbs-up'></span></h3>
                )}
                {formStatus==='error' && (
                    <h3 className='formStatusText a-show'><span style={{color:'red', fontSize: '10vw'}} className='fa fa-times'></span></h3>
                )}
                
            </section>
                <button className="close-btn" onClick={()=>{showLoginRegisterWindow(false)}}><span className="fa fa-remove"></span></button>
        </article>
    )
}

export default LoginRegister