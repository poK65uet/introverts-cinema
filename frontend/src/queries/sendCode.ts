import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const sendCode = async (
  email: string | undefined,
): Promise<string | boolean> => {
  let response: AxiosResponse<any>;
  response = await axios.post(`${config.apiEndpoint}/register/send-code`, {
    email: email,
  });

  return response.data.status;
};
