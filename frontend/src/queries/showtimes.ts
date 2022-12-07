import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getShowtimesByMovie = async (movieId: string): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(
      `${config.apiEndpoint}/showtimes?film=${movieId}`,
    );
  } catch (e) {
    return [''];
  }

  return response.data.data;
};

export const useGetShowtimesByMovie = (movieId: string) =>
  useQuery(['showtimes/getByMovie', movieId], () =>
    getShowtimesByMovie(movieId),
  );

export const getShowtimeDetail = async (id: string): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/showtimes/${id}`);
  } catch (e) {
    return [''];
  }

  return response.data.data;
};

export const useGetShowtimeDetail = (id: string) =>
  useQuery(['showtimes/getDetail', id], () => getShowtimeDetail(id));
