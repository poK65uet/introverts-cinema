import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getActors = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/actors/pagination`, authenticationHeader);
  } catch (e) {
    console.log(e);
    return [];
  }
  return response.data.data;
};

export const usegetActors = () => useQuery(['getActors'], () => getActors());

export const getActorByID = async (id: string | undefined): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/actors/${id}`);
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const usegetActorByID = (id: string | undefined) =>
  useQuery(['getActorByID'], () => getActorByID(id));

export const addActor = async (
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
    response = await axios.post(`${config.apiEndpoint}/actors`, {
      fullName: fullName,
      birthDay: birthDay,
      Nationality: Nationality,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const updateActor = async (
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
      response = await axios.patch(`${config.apiEndpoint}/actors`, {
        fullName: fullName,
        birthDay: birthDay,
        Nationality: Nationality,
      }, authenticationHeader);
    } catch (e) {
      return [];
    }
    return response.data.data;
  };
  
