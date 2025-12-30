import { useRef, useEffect } from 'react'
import './App.scss'

function App() {
  const checkbox = useRef(null);

  // Checking the checkbox on the start of application
  useEffect(() => {
    checkbox.current.checked = true
  })
  
  async function loginUser(event) {
    event.preventDefault();

    
  }

  return (
    <>
      <div className='signin'>
        <a href="" className="logo">
          <div></div>
          <span> Finnger </span>
        </a>
        <div className='text'>
          <h1> Holla, Welcome Back </h1>
          <h2> Hey, welcome back to your special place </h2>
        </div>
        <form className='signin__form' action="">
          <input type="text" id="username" placeholder='Enter username' name='username' required />
          <input type="password" placeholder='Enter password' id="password" name="password" required />
          <div className='signin__bottom'>
            <label>
              <input ref={checkbox} type="checkbox" id='remember' name='remember' />
              Remember me
            </label>
            <a href="#" className='signin__forgot'> Forgot password? </a>
          </div>
          <button className='signin__button' type='submit'> Sign In </button>
        </form>
        <div className='signin__signup'> Don't have an account? <a href="#"> Sign Up </a> </div>
      </div>
    </>
  )
}

export default App
