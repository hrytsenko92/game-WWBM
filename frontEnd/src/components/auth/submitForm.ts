import axios from 'axios';

type resp = {
  hasAccount?: boolean,
  token?: string
}

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const submitForm = async (
  username: string,
  password: string,
  hasAccount: boolean
) => {
     const data = {
       username,
       password,
     };
  const url: string = hasAccount
    ? 'login'
    : 'registration';

  try {
    const response= await axios.post(
      `http://localhost:5001/auth/${url}`,
      data,
      axiosConfig
    );
    const responseData: resp = response.data
    return responseData;
  } catch (error) {
    console.error('Помилка:', error);
  }
};
