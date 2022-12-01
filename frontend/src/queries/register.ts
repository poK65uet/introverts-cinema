import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const register = async (
  email: string,
  password: string,
  otp: number,
  fullName: string,
  phone: string,
  birthDay: string,
): Promise<string | boolean> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/register`, {
      email: email,
      password: password,
      code: otp,
      fullName: fullName,
      phone: phone,
      birthDay: birthDay,
    });
  } catch (e) {
    return false;
  }

  return response.data.status;
};
