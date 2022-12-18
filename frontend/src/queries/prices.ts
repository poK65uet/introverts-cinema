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
