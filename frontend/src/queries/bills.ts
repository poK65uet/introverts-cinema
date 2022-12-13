import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { useQuery } from 'react-query';

export const createBill = async (bill: {
  showtimeId: number;
  seats: { column: number; row: number; code: string }[];
}): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.post(
    `${config.apiEndpoint}/bills`,
    {
      showtimeId: bill.showtimeId,
      seats: bill.seats,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  );

  return response.data.data;
};

export const useCreateBill = (
  bill: {
    showtimeId: number;
    seats: { column: number; row: number; code: string }[];
  },
  queryOpts?: any,
) =>
  useQuery(['bill/createBill'], () => createBill(bill), {
    refetchOnWindowFocus: false,
    enabled: false,
    ...queryOpts,
  });

export const verifyBill = async (bill: number): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.post(
    `${config.apiEndpoint}/bills/verify-payment`,
    {
      bill: bill,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  );

  return response.data.data;
};

export const useVerifyBill = (bill: number, queryOpts?: any) =>
  useQuery(['bill/verifyBill'], () => verifyBill(bill), {
    refetchOnWindowFocus: false,
    enabled: false,
    ...queryOpts,
  });

export const cancelBill = async (bill: number): Promise<any> => {
  let response: AxiosResponse<any>;
  response = await axios.post(
    `${config.apiEndpoint}/bills/cancel`,
    {
      bill: bill,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  );

  return response.data.data;
};

export const useCancelBill = (bill: number, queryOpts?: any) =>
  useQuery(['bill/cancelBill'], () => cancelBill(bill), {
    refetchOnWindowFocus: false,
    enabled: false,
    ...queryOpts,
  });
