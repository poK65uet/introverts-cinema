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
    return undefined;
  }
  return response.data.data;
};

export const useGetMovieById = (id: string | undefined) =>
  useQuery(['movies/getMovieById'], () => getMovieById(id));

export const getMovies = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/films/pagination`);
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const useGetMovies = () => useQuery(['getMovies'], () => getMovies());

export const addMovie = async (
  title: string,
  imageUrl?: string,
  trailerUrl?: string,
  duration?: number,
  openingDay?: Date,
  description?: string,
  rated?: string,
  status?: string,
  NationalityId?: number,
  Categories?: number[],
  Actors?: number[],
  Directors?: number[],
): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${config.apiEndpoint}/films`, {
      title: title,
      imageUrl: imageUrl,
      trailerUrl: trailerUrl,
      duration: duration,
      openingDay: openingDay,
      description: description,
      rated: rated,
      status: status,
      NationalityId: NationalityId,
      Categories: Categories,
      Actors: Actors,
      Directors: Directors,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const updateMovie = async (
  title: string,
  imageUrl?: string,
  trailerUrl?: string,
  duration?: number,
  openingDay?: Date,
  description?: string,
  rated?: string,
  status?: string,
  NationalityId?: number,
  Categories?: number[],
  Actors?: number[],
  Directors?: number[],
): Promise<any> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.patch(`${config.apiEndpoint}/actors`, {
      title: title,
      imageUrl: imageUrl,
      trailerUrl: trailerUrl,
      duration: duration,
      openingDay: openingDay,
      description: description,
      rated: rated,
      status: status,
      NationalityId: NationalityId,
      Categories: Categories,
      Actors: Actors,
      Directors: Directors,
    });
  } catch (e) {
    return [];
  }
  return response.data.data;
};
