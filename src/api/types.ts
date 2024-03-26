type ApiArray<T> = { data: T[] };

type Quote = {
  fully_diluted_market_cap: number;
  last_updated: string;
  market_cap: number;
  market_cap_dominance: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_7d: number;
  percent_change_90d: number;
  price: number;
  volume_24h: number;
  volume_change_24h: number;
};

type Cryptocurrency = {
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  infinite_supply: boolean;
  last_updated: string;
  max_supply: number | null;
  name: string;
  num_market_pairs: number;
  quote: {
    [key: string]: Quote;
    USD: Quote;
  };
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  slug: string;
  symbol: string;
  tags: string[];
  total_supply: number;
};

export type { Cryptocurrency, ApiArray };
