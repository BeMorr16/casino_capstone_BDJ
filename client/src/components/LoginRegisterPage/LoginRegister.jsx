import { useState } from 'react';
import './LoginRegister.css';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../Utils/APIRequests';

export default function LoginRegister() {
  const [signIn, setSignIn] = useState(true);
  const [signInFormData, setSignInFormData] = useState({
    username: "",
    password: ""
  });
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
    mode: null
  });
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/cashier')
    },
    onError: (error) => {
      console.error('Registration error:', error);
    }
  })
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/cashier');
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  })

  function handleSignUpFormChange(e) {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  
  function handleSignInFormChange(e) {
    const { name, value } = e.target;
    setSignInFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    registerMutation.mutate(signUpFormData);
  }

  function handleSignInSubmit(e) {
    e.preventDefault();
    loginMutation.mutate(signInFormData);
  }

  const toggle = () => setSignIn(!signIn);

  return (
    <main className='mainLogin'>
      <div className='background'></div>
    <div className="container">
      <div className={`sign-up-container ${!signIn ? 'active' : ''}`}>
        <form className="form" onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          <input type='text' placeholder='Username' name='username' className="input" onChange={handleSignUpFormChange} required/>
          <input type='email' placeholder='Email' name='email' className="input" onChange={handleSignUpFormChange} required/>
          <input type='password' placeholder='Password' name='password' className="input" onChange={handleSignUpFormChange} required/>
          <button className="button">Sign Up</button>
        </form>
      </div>

      <div className={`sign-in-container ${signIn ? 'active' : ''}`}>
        <form className="form" onSubmit={handleSignInSubmit}>
          <h1>Sign in</h1>
          <input type='text' placeholder='Username' name='username' className="input" onChange={handleSignInFormChange} required/>
          <input type='password' placeholder='Password' name='password' className="input" onChange={handleSignInFormChange} required/>
          {loginMutation.isPending ? <div>loading</div>: <button className="button">Sign In</button>}
        </form>
      </div>

      <div className={`overlay-container ${signIn ? '' : 'active'}`}>
        <div className="overlay">
          <div className={`left-overlay-panel ${signIn ? 'inactive' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Login to access your progress</p>
            <button type='button' className="ghost-button" onClick={toggle}>Sign In</button>
          </div>
          <div className={`right-overlay-panel ${signIn ? '' : 'inactive'}`}>
            <h1>Hello, Friend!</h1>
            <p>Start your journey</p>
            <button type='button' className="ghost-button" onClick={toggle}>Sign Up</button>
          </div>
        </div>
      </div>
      </div>
      </main>
  );
}
