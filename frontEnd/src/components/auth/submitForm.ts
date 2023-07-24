import axios from 'axios';
import {urlPath} from '../../types/allType';

export type HasAccTrueType = {
  token: string;
};
export type HasAccFalseType = {
  isRegistrated?: boolean;
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
  const url: string = hasAccount ? 'login' : 'registration';
  try {
    const response = await axios.post(
      `${urlPath}/auth/${url}`,
      data,
      axiosConfig
    );
    if (hasAccount) {
      const responseData: HasAccTrueType = response.data;
      return responseData;
    } else {
      const responseData: HasAccFalseType = response.data;
      return responseData;
    }
  } catch (error) {
    console.error('Помилка:', error);
  }
};
