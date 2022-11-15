import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const login = async (
  email: string,
  password: string,
): Promise<boolean> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/login`, {
      email: email,
      password: password,
    });
  } catch (e) {
    return false;
  }
  return response.data.data.user !== null;
};
