import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getShowtimesByMovie = async (movieId: string): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/showtimes?film=${movieId}`);

  return response.data.data;
};

export const useGetShowtimesByMovie = (movieId: string) =>
  useQuery(['showtimes/getByMovie', movieId], () =>
    getShowtimesByMovie(movieId),
  );

export const getShowtimeDetail = async (id: string): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/showtimes/${id}`);

  return response.data.data;
};

export const useGetShowtimeDetail = (id: string) =>
  useQuery(['showtimes/getDetail', id], () => getShowtimeDetail(id), {});

export const createBill = async ({}): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.post(`${config.apiEndpoint}/bills`, {
    data: {},
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  return response.data.data;
};
