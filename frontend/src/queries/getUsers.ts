import axios, { AxiosResponse } from 'axios'; 
import config from 'config';
import { useQuery } from 'react-query';

// interface Users {
//   id: number,
//   customerFullname: string,
//   customerEmail: string,
//   customerBirthday: string,
// }

export const getUsers = async (
  page: number,
  size: number, 
): Promise<readonly any[]> => {
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
  useQuery(['users'], () => getUsers(page, size));
