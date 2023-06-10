import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import logo from './logo.svg';
import LogoutContext from '../Contexts/ContextProviders';

function Login(props) {
  const { setIsAuthenticated, setCurrentUser } = props;
  const { setHasLoggedOut } = useContext(LogoutContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authFailed, setAuthFailed] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const uri = `${process.env.REACT_APP_HOSTNAME}/api/login`;

    try {
      const response = await axios
        .post(uri, {
          email,
          password,
        })
        .then((res) => {
          console.log('response: ', res);
          console.log('response: ', res.status);

          // Check if login was successful (token received)
          if (res.status === 200) {
            localStorage.setItem('lstoken', JSON.stringify(res.data.accessToken));
            console.log('Set iaAuthenticated to true. Received state 200');
            console.log('set Currentuser to: ', JSON.stringify(res.data));
            setIsAuthenticated(true);
            setCurrentUser(JSON.stringify(res.data.user));
            setHasLoggedOut(true);
            history('/editor', { replace: true });
          }
        });
    } catch (err) {
      console.log('invalid');
      // Handle unsuccessful login (e.g., display error message)
      setIsAuthenticated(false);
      setAuthFailed(true);
      // Handle login error
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-16 w-auto' src={logo} alt='Logo' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in</h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address'>
                Email address
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </label>
            </div>
            <div>
              <label htmlFor='password'>
                Password
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </label>
            </div>
          </div>
          {authFailed && (
            <span className='mt-2 text-red-600 text-sm'>Invalid Username of Password</span>
          )}
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
Login.propTypes = {
  setIsAuthenticated: PropTypes.func,
  setCurrentUser: PropTypes.func,
};

Login.defaultProps = {
  setIsAuthenticated: () => {},
  setCurrentUser: () => {},
};

export default Login;
