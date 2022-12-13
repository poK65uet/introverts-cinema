import axios, { AxiosResponse } from 'axios';
import config from 'config';

export const getBanners = async (): Promise<string[]> => {
  let response: AxiosResponse<any>;
  response = await axios.get(`${config.apiEndpoint}/banners`);

  return response.data.data;
};
