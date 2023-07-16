import axios, { AxiosError } from "axios";


export const updateUserData = async (userToken: string, id: string) => {
  try {
    const token = String(userToken);
    const response = await axios.put(
      'http://localhost:5001/game/updateuserdata',
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
      'http://localhost:5001/game/getquestion',
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