import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const sendCode = async (
  email: string,
  password: string,
  otp: number,
): Promise<string | boolean> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/register`, {
      email: email,
      password: password,
      code: otp,
    });
  } catch (e) {
    return false;
  }

  return response.data.status;
};
