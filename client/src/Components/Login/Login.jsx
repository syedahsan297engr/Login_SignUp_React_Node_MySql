import React, {useState, useEffect} from 'react'
import './Login.scss'
import '../../App.scss'
import video from '../../LoginAssets/Recycle.mp4';
import logo from '../../LoginAssets/logo.png'
import { FaUserShield } from "react-icons/fa";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';


const Login = () => {
  //UseState hook to store inputs
  
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigateTo = useNavigate();


  //show some message to user
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  const sendCredentials = (e) => {
    e.preventDefault(); //for getting res
    //use axios for sending data to backend or getting data from backend
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      //variables to be sent to server
      LoginUserName : loginUserName,
      LoginPassword : loginPassword
    }).then((response)=>{
      //console.log(response.data); //it contains msg from backend

      if(response.data.message) {
        navigateTo('/');
        setLoginStatus(`Credentials Don't Exist`);
      }
      else{
        navigateTo('/dashboard');
      }
    })
  }

  const onSubmit = () =>{
    setLoginPassword('')
    setLoginUserName('')
  }

  useEffect(()=>{
    if(loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
    }
  },[loginStatus])

  return (
    <div>
      <div className="loginPage flex">
        <div className="container flex">

        
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'>Revive Cycle, The Smart Recycling Solution</h2>
              <p>Save the Nature!</p>
            </div>

            <div className="footerDiv flex">
              <span className='text'>Don't have an Account?</span>
              <Link to={'/register'}>
              <button className='btn'>Sign Up</button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">

            <div className="headerDiv">
              <img src={logo} alt="Logo Image"/>
              <h3>Welcome Back!</h3>
            </div>

            <form action="" className='form grid' onSubmit={onSubmit}>
              <span className={statusHolder}>{loginStatus}</span>
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text"  id='username' placeholder='enter username'
                onChange={(event) => {
                  setLoginUserName(event.target.value)
                }}/>
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password"  id='password' placeholder='enter password'
                onChange={(event) => {
                  setLoginPassword(event.target.value)
                }}/>
                </div>
              </div>

              <button type='submit' className='btn flex' onClick={sendCredentials}>
                <span>Login</span>
                <AiOutlineSwapRight className='icon'/>
              </button>

              <span className='forgotPassword'>
                Forgot your Password? <a href="">Click Here</a>
              </span>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
