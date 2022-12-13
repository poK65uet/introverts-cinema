import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';


export const getCategoryByID = async (id: string | undefined): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.get(`${config.apiEndpoint}/categories/${id}`);
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const usegetCategoryByID = (id: string | undefined) =>
  useQuery(['getCategoryByID'], () => getCategoryByID(id));

  export const getCategories = async (): Promise<any> => {
    let response: AxiosResponse<any>;
    const token = sessionStorage.getItem('token');
    const authenticationHeader = {
        headers: {Authorization: `Bearer ${token}`}
    }
    try {
      response = await axios.get(`${config.apiEndpoint}/categories/pagination`, authenticationHeader);
    } catch (e) {
      console.log(e);
      return [];
    }
    return response.data.data;
  };
  
  export const useGetCategories = () => useQuery(['getCategories'], () => getCategories(), {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  
export const addCategory = async (
  fullName: string,
  birthDay?: Date,
  Category?: number,
): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
      headers: {Authorization: `Bearer ${token}`}
  }
  try {
    response = await axios.post(`${config.apiEndpoint}/categories`, {
      fullName: fullName,
      birthDay: birthDay,
      Category: Category,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const updateCategory = async (
    fullName: string,
    birthDay?: Date,
    Category?: number,
  ): Promise<any> => {
    let response: AxiosResponse<any>;
    const token = sessionStorage.getItem('token');
    const authenticationHeader = {
        headers: {Authorization: `Bearer ${token}`}
    }
    try {
      response = await axios.patch(`${config.apiEndpoint}/categories`, {
        fullName: fullName,
        birthDay: birthDay,
        Category: Category,
      }, authenticationHeader);
    } catch (e) {
      return [];
    }
    return response.data.data;
  };
  
