import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getNewMovies = async (): Promise<string[]> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/films/opening`);
  } catch (e) {
    return [''];
  }

  return response.data.data;
};

export const getUpcomingMovies = async (): Promise<string[]> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/films/upcoming`);
  } catch (e) {
    return [''];
  }

  return response.data.data;
};

export const getMovieById = async (id: string | undefined): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/films/${id}`);
  } catch (e) {
    return '';
  }
  return response.data.data;
};

export const useGetMovieById = (id: string | undefined) =>
  useQuery(['movies/getMovieById'], () => getMovieById(id));
