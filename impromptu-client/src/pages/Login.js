import React, { useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import { Link, redirect, useNavigate} from 'react-router-dom';
const api_url = "http://localhost:8000";

function Login({user, setUser}) {
    const [loginState, setLoginState] = useState(0);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
      if (user) {
        // console.log(user);
        navigate("/");
      }
    }, [])
   
    function renderLoginPage(){
        switch (loginState) {
            case 0:
                return <div><LoginPrompt handleLogin={setLoginState} passUsername={setUsername} setUser={setUser}/></div>
            case 1:
                return <div><WelcomePage username={username}/></div>
            case 2:
                return <div><SignUpThankYouPage username={username}/></div>
        }
    }
    return renderLoginPage()
}

function SignUpThankYouPage({ username }) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 bg-blue-300 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Thank you for signing up {username}, welcome to imPROMPTu</h2>
          <Link to="/prompt">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            start playing!
          </button>
          </Link>
        </div>
      </div>
    );
  }

  function WelcomePage({ username }) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 bg-blue-300 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Welcome {username}, you are logged in</h2>
          <Link to="/prompt">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            start playing!
          </button>
          </Link>
        </div>
      </div>
    );
  }

function LoginPrompt({handleLogin, passUsername, setUser}){
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [displayErr, setDisplayErr] = useState(false);

  const resetFields = () => {
    setEmail('')
    setPassword('')
    setUsername('')
    setErrMessage('')
    setDisplayErr(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      // console.log('Logging in with', {username, password});
      axios.post(`${api_url}/login`,{username, password}, {withCredentials: true}).then((res, err) => {
        // console.log(res);
        setUser(res.data.user);
        handleLogin(1)
        passUsername(username)
      }).catch((err) => {
        console.log(err);
        setErrMessage(err.response.data["error"])
        setDisplayErr(true)
      })
    } else {
      // Handle account creation
      const creds = {email, username, password }
      // console.log('Creating account with', creds);
      axios.post(`${api_url}/signup`, creds, {withCredentials: true}).then((res, err) => {
        // console.log(res);
        handleLogin(2)
        setUser(res.data.user);
        passUsername(username)
      }).catch((err) => {
        console.log(err);
        setErrMessage(err.response.data["error"])
        setDisplayErr(true)
      })
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-blue-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Log In' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxlength="25"
              />
            </div>
        {displayErr && (
            <p class="text-red-500 text-s">{errMessage}</p>
        )}
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => {setIsLogin(!isLogin); resetFields()}}
            className="text-blue-500 hover:text-blue-700"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
