import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const getBanners = async (): Promise<string[]> => {
  let response: AxiosResponse<any>;
  try {
    response = await axios.get(`${config.apiEndpoint}/banners`);
  } catch (e) {
    return [];
  }

  return response.data.data;
};
