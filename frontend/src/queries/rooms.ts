import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getRoomByID = async (id: string | undefined): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(`${config.apiEndpoint}/rooms/${id}`);
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const usegetRoomByID = (id: string | undefined) =>
  useQuery(['getRoomByID'], () => getRoomByID(id));

export const getRooms = async (page: number, size: number): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(
      `${config.apiEndpoint}/rooms/pagination?page=${page}&size=${size}`,
      authenticationHeader,
    );
  } catch (e) {
    console.log(e);
    return [];
  }
  return response.data.data;
};

export const useGetRooms = (page: number, size: number) =>
  useQuery(['getRooms', page, size], () => getRooms(page, size), {
    // enabled: false,
    refetchOnWindowFocus: false,
  });

export const getAllRooms = async (): Promise<any> => {
  let response: AxiosResponse<any>;

  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    response = await axios.get(
      `${config.apiEndpoint}/rooms/pagination`,
      authenticationHeader,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const useGetAllRooms = () =>
  useQuery(['getAllRooms'], () => getAllRooms());

export const addRoom = async (
  fullName: string,
  birthDay?: Date,
  Room?: number,
): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.post(`${config.apiEndpoint}/rooms`, {
      fullName: fullName,
      birthDay: birthDay,
      Room: Room,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const updateRoom = async (
  fullName: string,
  birthDay?: Date,
  Room?: number,
): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.patch(
      `${config.apiEndpoint}/rooms`,
      {
        fullName: fullName,
        birthDay: birthDay,
        Room: Room,
      },
      authenticationHeader,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};
