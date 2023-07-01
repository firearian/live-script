import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentContext } from '../Contexts/CurrentContext';
import { useLocalStorageContext } from '../Contexts/LocalStorageContext';
import { ROUTES, HTTP_STATUS_CODES, ERROR_MESSAGES } from '../Constants';
import loginUser from '../API';
import InputField from '../Components/InputField';
import logo from './logo.svg';
import '../index.css';

function Login() {
  const { setIsAuthenticated, setCurrentRoom } = useCurrentContext();
  const { setToken, setUser } = useLocalStorageContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorData, setErrorData] = useState({
    error: '',
    errorCode: '',
  });

  useEffect(() => {
    setPassword('');
    setEmail('');
    setErrorData({
      error: '',
      errorCode: '',
    });
  }, []);

  const history = useNavigate();

  const handleChange = (newState) => {
    setErrorData({ ...errorData, ...newState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChange({ name: 'error', value: '' });
    handleChange({ name: 'errorCode', value: '' });
    try {
      const res = await loginUser(email, password);
      // Check if login was successful (token received)
      if (res.status === 200) {
        setUser(res.data.user);
        setToken(JSON.stringify(res.data.accessToken)); // .replaceAll(/"/g, ''));
        setCurrentRoom(res.data.user.documents[0]);
        history(ROUTES.editor, { replace: true });
      }
    } catch (err) {
      // Handle unsuccessful login (e.g., display error message)
      setIsAuthenticated(false);
      if (err.cause.code === 'ERR_NETWORK') {
        handleChange({
          error: 'Server unresponsive. Please ask the admin to restart it',
          errorCode: '500',
        });
      } else {
        const errorContent =
          ERROR_MESSAGES[err.cause.response.status] ||
          HTTP_STATUS_CODES[err.cause.response.status] ||
          'An error occurred. Please try again later.';
        handleChange({
          error: errorContent,
          errorCode: err.cause.response.status,
        });
      }
    }
    setPassword('');
  };

  return (
    <div className='login-container min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='mx-auto mt-6'>
          <img className='m-auto h-16 w-auto' src={logo} alt='Logo' />
          <h2 className='font-courier text-center text-3xl font-extrabold text-gray-900'>
            Sign in
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px text-gray-600 font-courier text-xs'>
            <InputField
              id='email'
              type='email-address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
            />
            <div className='pt-2' />
            <InputField
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </div>
          {errorData.errorCode && <p className='mt-2 text-red-600 text-sm'>{errorData.error}</p>}
          <button
            type='submit'
            className='text-sm group relative w-full flex justify-center py-2 px-4 border border-transparent text-courier font-medium rounded-md text-white bg-black hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
