import axios from 'axios';

const loginUser = async (email, password) => {
  const uri = `${process.env.REACT_APP_HOSTNAME}/api/login`;
  try {
    const response = await axios.post(uri, { email, password });
    return response;
  } catch (error) {
    throw new Error('error', { cause: error });
  }
};
export default loginUser;
