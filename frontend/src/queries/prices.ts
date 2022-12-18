import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getPrices = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(
      `${config.apiEndpoint}/prices`,
      authenticationHeader,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const useGetPrices = () =>
  useQuery(['getPrices'], () => getPrices(), {
    refetchOnWindowFocus: false,
  });

export const updatePrice = async (id: string, value: number): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  response = await axios.patch(
    `${config.apiEndpoint}/prices/${id}`,
    {
      value: value,
    },
    authenticationHeader,
  );
  return response.data.data;
};

export const useUpdatePrice = (id: string, value: number) =>
  useQuery(['updatePrice'], () => updatePrice(id, value), {
    enabled: false,
    refetchOnWindowFocus: false,
  });
