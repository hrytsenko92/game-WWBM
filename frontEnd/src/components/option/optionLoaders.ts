import axios, { AxiosError } from 'axios';
import { urlPath } from '../../types/allType';

export type ParamType = {
  userToken: string;
};

export const loadUserScore = async (userToken: string) => {
  try {
    const token = String(userToken);
    const response = await axios.get(`${urlPath}/option/userscore`, {
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

export const resetUserScore = async (userToken: string) => {
  try {
    const token = String(userToken);
    const response = await axios.get(`${urlPath}/option/resetuserscore`, {
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


export const loadAllScore = async (userToken: string) => {
  try {
    const token = String(userToken);
    const response = await axios.get(`${urlPath}/option/allscore`, {
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

