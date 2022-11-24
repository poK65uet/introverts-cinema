import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const login = async (
  email: string,
  password: string,
): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/login`, {
      email: email,
      password: password,
    });
  } catch (e) {
    return false;
  }
  if (
    response.data.data.token !== null &&
    response.data.data.token !== undefined
  )
    sessionStorage.setItem('token', response.data.data.token);

  return response.data.data.user !== undefined;
};

export const useLogin = (email: string, password: string) =>
  useQuery(['login'], () => login(email, password));
