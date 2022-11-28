import axios, { AxiosResponse } from 'axios'; 
import config from 'config';
import { useQuery } from 'react-query';

export const getUsers = async (
  page: number,
  size: number, 
): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/users/pagination?page=${page}&size=${size}`, {
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const usegetUsers = (page: number, size: number) =>
  useQuery(['getUsers'], () => getUsers(page, size));
