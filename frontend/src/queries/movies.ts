import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const getNewMovies = async (): Promise<string[]> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/films/opening`);

  return response.data.data;
};

export const getUpcomingMovies = async (): Promise<string[]> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/films/upcoming`);

  return response.data.data;
};

export const getMovieById = async (id: string | undefined): Promise<any> => {
  if (id === '0') return undefined;
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/films/${id}`);

  return response.data.data;
};

export const useGetMovieById = (id: string | undefined, queryOpts?: any) =>
  useQuery(['get-movie-by-id'], () => getMovieById(id), {
    refetchOnWindowFocus: false,
    ...queryOpts,
  });

export const getMovies = async (): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/films/pagination`);

  return response.data.data;
};

export const useGetMovies = () =>
  useQuery(['get-movies'], () => getMovies(), {
    refetchOnWindowFocus: false,
  });

export const addMovie = async (
  id: string,
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
    response = await axios.post(`${config.apiEndpoint}/films/${id}`, {
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
    console.log(e);
    return [];
  }
  console.log('ADD OK');
  return response.data.data;
};

export const updateMovie = async (
  id: string,
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
    response = await axios.patch(`${config.apiEndpoint}/films/${id}`, {
      title: title,
      imageUrl: imageUrl,
      trailerUrl: trailerUrl,
      duration: duration,
      openingDay: openingDay,
      description: description,
      rated: rated,
      status: status,
      Nationality: NationalityId,
      Categories: Categories,
      Actors: Actors,
      Directors: Directors,
    });
  } catch (e) {
    return [];
  }
  console.log('EDIT OK');
  return response.data.data;
};
