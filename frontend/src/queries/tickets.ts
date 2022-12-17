import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getUserTickets = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/tickets/me`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  return response.data.data;
};

export const useGetUserTickets = (queryOpts?: any) =>
  useQuery(['tickets/getUserTickets'], () => getUserTickets(), {
    refetchOnWindowFocus: false,
    ...queryOpts,
  });

export const getTickets = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(
      `${config.apiEndpoint}/tickets/pagination`,
      authenticationHeader,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const useGetTickets = () =>
  useQuery(['getTickets'], () => getTickets(), {
    refetchOnWindowFocus: false,
  });
