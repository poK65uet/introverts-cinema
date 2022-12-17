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
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(
      `${config.apiEndpoint}/films/${id}`,
      authenticationHeader,
    );
  } catch (e) {
    return undefined;
  }
  return response.data.data;
};

export const useGetMovieById = (id: string | undefined, queryOpts?: any) =>
  useQuery(['get-movie-by-id'], () => getMovieById(id), {
    refetchOnWindowFocus: false,
    ...queryOpts,
  });

export const getMovies = async (page: number, size: number): Promise<any> => {
  let response: AxiosResponse<any>;

  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    response = await axios.get(
      `${config.apiEndpoint}/films/pagination?page=${page}&size=${size}&sort=openingDay,DESC`,
      authenticationHeader,
    );
  } catch (e) {
    console.log(e);
    return [];
  }
  return response.data.data;
};

export const useGetMovies = (page: number, size: number) =>
  useQuery(['getMovies', page, size], () => getMovies(page, size));

export const getAllMovies = async (): Promise<any> => {
  let response: AxiosResponse<any>;

  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    response = await axios.get(
      `${config.apiEndpoint}/films/active`,
      authenticationHeader,
    );
  } catch (e) {
    console.log(e);
    return [];
  }
  return response.data.data;
};

export const useGetAllMovies = () =>
  useQuery(['getAllMovies'], () => getAllMovies());

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
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.post(
      `${config.apiEndpoint}/films/${id}`,
      {
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
      },
      authenticationHeader,
    );
  } catch (e) {
    console.log(e);
    return [];
  }
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
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.patch(
      `${config.apiEndpoint}/films/${id}`,
      {
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
      },
      authenticationHeader,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const searchMovies = async (query: string): Promise<any> => {
  if (query === '') return undefined;
  let response: AxiosResponse<any>;
  const token = sessionStorage.getItem('token');
  const authenticationHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    response = await axios.get(
      `${config.apiEndpoint}/films/pagination?query=${query}`,
      authenticationHeader,
    );
  } catch (e) {
    return [];
  }
  return response.data.data;
};

export const useSearchMovies = (query: string) =>
  useQuery(['getMovies', query], () => searchMovies(query), {
    refetchOnWindowFocus: false,
  });
