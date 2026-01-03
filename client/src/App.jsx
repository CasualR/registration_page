import { useRef, useEffect, useState } from 'react'
import './App.scss'

function App() {
  const checkbox = useRef(null);

  // Checking the checkbox on the start of application
  useEffect(() => {
    checkbox.current.checked = true
  })
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
      });

      // const response = await fetch('http://localhost:3000/api/user');

      let data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      console.log(data);

    } catch (error) {
      console.log(error.message);
    }
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
        <form onSubmit={handleLogin} className='signin__form' action="">
          <input onChange={e => setUsername(e.target.value)} type="text" id="username" placeholder='Enter username' name='username' required />
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder='Enter password' id="password" name="password" required />
          {error && <p>{error}</p>}
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
