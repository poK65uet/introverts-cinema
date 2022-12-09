import axios, { AxiosResponse } from 'axios'; 
import config from 'config';
import { useQuery } from 'react-query';

export const getUsers = async (
  page: number,
  size: number, 
): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/users/pagination?page=${page}&size=${size}`, authenticationHeader);
  } catch (e) { 
    return [];
  }
  return response.data.data;
};

export const useGetUsers = (page: number, size: number) =>
  useQuery(['getUsers', page, size], () => getUsers(page, size));
