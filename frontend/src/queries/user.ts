import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getUsers = async (page: number, size: number): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(
      `${config.apiEndpoint}/users/pagination?page=${page}&size=${size}`,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const useGetUsers = (page: number, size: number) =>
  useQuery(['getUsers', page, size], () => getUsers(page, size));

export const getUserProfile = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/users/me`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  return response.data.data;
};

export const useGetUserProfile = () =>
  useQuery(['user/getUserProfile'], () => getUserProfile());

export const changeProfile = async (newProfile: any): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.patch(`${config.apiEndpoint}/users/change-info`, {
    data: {
      fullName: newProfile.fullName,
      phone: newProfile.phone,
      birthDay: newProfile.birthDay,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  return response.data.data;
};

export const useChangeProfile = (newProfile: any) =>
  useQuery(['user/changeProfile'], () => changeProfile(newProfile), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

export const verifyPassword = async (password: string): Promise<any> => {
  let response: AxiosResponse<any>;
  console.log(sessionStorage.getItem('token'));

  response = await axios.post(`${config.apiEndpoint}/users/verify-password`, {
    data: {
      password: password,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  console.log(sessionStorage.getItem('token'));

  return response.data.data;
};

export const useVerifyPassword = (password: string) =>
  useQuery(['user/verifyPassword'], () => verifyPassword(password), {
    refetchOnWindowFocus: false,
    enabled: false,
  });
