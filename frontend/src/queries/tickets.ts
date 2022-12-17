import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

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

export const getTicketsPagination = async (
  page: number,
  size: number,
): Promise<any> => {
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(
      `${config.apiEndpoint}/tickets/pagination&page=${page}&size=${size}`,
      authenticationHeader,
    );
  } catch (e) {
    console.log(e);
    return [];
  }
  return response.data.data;
};

export const useGetTicketsPagination = (page: number, size: number) =>
  useQuery(
    ['getTicketsPagination', page, size],
    () => getTicketsPagination(page, size),
    {
      refetchOnWindowFocus: false,
    },
  );
