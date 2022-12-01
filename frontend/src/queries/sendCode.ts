import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const sendCode = async (
  email: string | undefined,
): Promise<string | boolean> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/register/sendCode`, {
      email: email,
    });
  } catch (e) {
    return false;
  }
  return response.data.status;
};
