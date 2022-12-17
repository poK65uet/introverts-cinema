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
