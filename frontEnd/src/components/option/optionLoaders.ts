import axios, { AxiosError } from 'axios';

export type ParamType = {
  userToken: string;
};

export const loadAllScore = async (userToken: string) => {
  try {
    const token = String(userToken);
    const response = await axios.get('http://localhost:5001/option/allscore', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (!axios.isAxiosError(errors)) {
      console.log(errors);
    }
    console.log(`Axios error: ${err}`);
  }
};

export const loadUserScore = async (userToken: string) => {
  try {
    const token = String(userToken);
    const response = await axios.get('http://localhost:5001/option/userscore', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (!axios.isAxiosError(errors)) {
      console.log(errors);
    }
    console.log(`Axios error: ${err}`);
  }
};
