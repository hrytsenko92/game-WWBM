import axios, { AxiosError } from "axios";
import { urlPath } from '../../types/allType';


export const updateUserData = async (userToken: string, id: string) => {
  try {
    const token = String(userToken);
    const response = await axios.put(
      `${urlPath}/game/updateuserdata`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (!axios.isAxiosError(errors)) {
      console.log(errors);
    }
    console.log(`Axios error: ${err}`);
  }
};

export const getQuestion = async (userToken: string, complexity: number) => {
  try {
    const token = String(userToken);
    const response = await axios.get(
      `${urlPath}/game/getquestion`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          complexity
        },
      }
    );
    return response.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (!axios.isAxiosError(errors)) {
      console.log(errors);
    }
    console.log(`Axios error: ${err}`);
  }
};

export const updateUserScore = async (userToken: string, bestScore: number) => {
  try {
    const token = String(userToken);
    const response = await axios.put(
      `${urlPath}/option/updateuserscore`,
      { bestScore },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (!axios.isAxiosError(errors)) {
      console.log(errors);
    }
    console.log(`Axios error: ${err}`);
  }
};