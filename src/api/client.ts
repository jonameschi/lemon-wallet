import axios from 'axios';

import Config from 'react-native-config';
import { ApiArray, Cryptocurrency } from './types';

const { COIN_MARKET_API_KEY } = Config;
const API_URL = 'https://pro-api.coinmarketcap.com';

const axiosClient = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      'X-CMC_PRO_API_KEY': COIN_MARKET_API_KEY,
    },
  });

const useApi = () => {
  const getCurrencies = async () => {
    const data = await axiosClient().get<ApiArray<Cryptocurrency>>(
      '/v1/cryptocurrency/listings/latest',
    );
    return data.data.data;
  };

  const getCurrencyById = async (id: number) => {
    const data = await axiosClient().get<ApiArray<Cryptocurrency>>(
      `/v1/cryptocurrency/quotes/latest?id=${id.toString()}`,
    );
    return data.data.data;
  };

  return { getCurrencies, getCurrencyById };
};

export { useApi };
