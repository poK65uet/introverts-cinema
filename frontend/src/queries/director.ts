import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getDirectors = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/directors/pagination`, authenticationHeader);
  } catch (e) {
    console.log(e);
    return [];
  }
  return response.data.data;
};

export const useGetDirectors = () => useQuery(['getDirectors'], () => getDirectors(), {
  enabled: false,
  refetchOnWindowFocus: false,
});

export const getDirectorByID = async (id: string | undefined): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/directors/${id}`);
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const usegetDirectorByID = (id: string | undefined) =>
  useQuery(['getDirectorByID'], () => getDirectorByID(id));

export const addDirector = async (
  fullName: string,
  birthDay?: Date,
  Nationality?: number,
): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.post(`${config.apiEndpoint}/directors`, {
      fullName: fullName,
      birthDay: birthDay,
      Nationality: Nationality,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const updateDirector = async (
    fullName: string,
    birthDay?: Date,
    Nationality?: number,
  ): Promise<any> => {
    let response: AxiosResponse<any>;
    const token = sessionStorage.getItem('token');
    const authenticationHeader = {
        headers: {Authorization: `Bearer ${token}`}
    }
    try {
      response = await axios.patch(`${config.apiEndpoint}/directors`, {
        fullName: fullName,
        birthDay: birthDay,
        Nationality: Nationality,
      }, authenticationHeader);
    } catch (e) {
      return [];
    }
    return response.data.data;
  };
  
