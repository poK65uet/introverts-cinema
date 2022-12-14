import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';


export const getNationalityByID = async (id: string | undefined): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/nationalities/${id}`);
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const usegetNationalityByID = (id: string | undefined) =>
  useQuery(['getNationalityByID'], () => getNationalityByID(id));

  export const getNationalities = async (): Promise<any> => {
    let response: AxiosResponse<any>;
    const token = sessionStorage.getItem('token');
    const authenticationHeader = {
        headers: {Authorization: `Bearer ${token}`}
    }
    try {
      response = await axios.get(`${config.apiEndpoint}/nationalities/pagination`, authenticationHeader);
    } catch (e) {
      console.log(e);
      return [];
    }
    return response.data.data;
  };
  
  export const useGetNationalities = () => useQuery(['getNationalities'], () => getNationalities(), {
    // enabled: false,
    // refetchOnWindowFocus: false,
  });

  
export const addNationality = async (
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
    response = await axios.post(`${config.apiEndpoint}/nationalities`, {
      fullName: fullName,
      birthDay: birthDay,
      Nationality: Nationality,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const updateNationality = async (
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
      response = await axios.patch(`${config.apiEndpoint}/nationalities`, {
        fullName: fullName,
        birthDay: birthDay,
        Nationality: Nationality,
      }, authenticationHeader);
    } catch (e) {
      return [];
    }
    return response.data.data;
  };
  
