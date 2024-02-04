import React, {useState, useEffect} from 'react'
import './Register.scss'
import '../../App.scss'
import video from '../../LoginAssets/Recycle.mp4';
import logo from '../../LoginAssets/logo.png'
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import {Link, useNavigate} from 'react-router-dom';
import { MdMarkEmailRead } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Axios from 'axios';
const Register = () => {
  //useState for holding the record of forms which soon be posted in db
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');
  //when button is clicked
  const createUser = () => {
    //use axios for sending data to backend or getting data from backend
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/register2`, {
      //variables to be sent to server
      Email : email,
      UserName : userName,
      Password : password
    }).then((response)=>{
      //console.log(response);
    }).catch((error) => {
      console.error(error);
      setError('Registration failed!');
    });
  }
      
  const navigateTo = useNavigate(); //for getting to login page
  const onSubmit = () =>{
    navigateTo('/');
    setEmail('');
    setUserName('');
    setPassword('');
  }

  //for error check and showing msg
  useEffect(()=>{
    if(error !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 3000);
    }
  },[error])

  return (
    <div>
      <div className="registerPage flex">
        <div className="container flex">

        
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'>Revive Cycle, The Smart Recycling Solution</h2>
              <p>Save the Nature!</p>
            </div>

            <div className="footerDiv flex">
              <span className='text'>Already have an Account?</span>
              <Link to={'/'}>
              <button className='btn'>Log in</button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">

            <div className="headerDiv">
              <img src={logo} alt="Logo Image" className='smallicon'/>
              <h3>Let Us Know You!</h3>
            </div>

            <form action="" className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{error}</span>
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input type="email"  id='email' placeholder='Enter Email'
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                required/>
                </div>
              </div>
              
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                <FaUserEdit className='icon'/>
                <input type="username"  id='username' placeholder='Enter username'
                onChange={(event) => {
                  setUserName(event.target.value) //for sending data to backend
                }}
                required/>
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password"  id='password' placeholder='enter password'
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                required/>
                </div>
              </div>

              <button type='submit' className='btn flex' onClick={createUser}>
                <span>Register</span>
                <AiOutlineSwapRight className='icon'/>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register
