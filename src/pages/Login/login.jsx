import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import netflix_spinner from '../../assets/netflix_spinner.gif'; 


const Login = () => {

  const [signState, setSignState] = React.useState("Sign In");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  const user_auth = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    if (signState === "Sign In") {
        await login(email, password);
      } 
     else {
        await signup(email, password, name);
    } 
    setLoading(false);
  }
 
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>: 
    <div className="login">
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ?
          <input value={name} onChange={(e) => { setName(e.target.value) }}
          type="text" placeholder='Your name' /> : null}
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} 
          type="email" placeholder='Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} 
          type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit' className='btn'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <span>Need help?</span>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In"?
          <p>New to netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          : <p>Already have an account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
          
        </div>
      </div>
    </div>
  )
}

export default Login
