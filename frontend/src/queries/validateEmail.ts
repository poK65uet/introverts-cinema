import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const validateEmail = async (
  email: string,
): Promise<string | boolean> => {
  let response: AxiosResponse<any>;

  if (email == '') {
    return 'unfilled_email';
  }

  try {
    response = await axios.post(`${config.apiEndpoint}/register/checkEmail`, {
      email: email,
    });
  } catch (e) {
    return false;
  }

  return response.data.data;
};
