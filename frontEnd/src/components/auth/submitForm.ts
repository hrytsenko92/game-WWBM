import axios from 'axios';

export type userDataType = {
  isRegistrated?: boolean;
  token?: string;
  id?: string;
};

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
    const responseData: userDataType = response.data;
    return responseData;
  } catch (error) {
    console.error('Помилка:', error);
  }
};
