import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getUsers = async (
  email: string,
  password: string,
): Promise<boolean> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/user`, {
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

export const usegetUsers = (email: string, password: string) =>
  useQuery(['users'], () => getUsers(email, password));
