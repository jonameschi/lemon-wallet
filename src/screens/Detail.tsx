import { FC, useCallback, useMemo } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Cryptocurrency, useApi } from '@api';
import { Header, Row, Spacer, StatusBar } from '@components';
import { formatNumberToLocale } from '@helpers/helper';
import { SC } from 'navigation/types';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { theme as themeColor } from 'theme/theme';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';

const URI_ICON = 'https://s2.coinmarketcap.com/static/img/coins/64x64/';
const REFRESH_INTERVAL = 30000;

type HistoricalData = {
  close: number;
  day: number;
};

// I generate random data for the chart because the api does not provide historical data without a paid plan
const randomData = (price: number): HistoricalData[] =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    close: Math.random() * (price * 0.2) + price,
  }));

type LineChartProps = {
  price: number;
};

const LineChart: FC<LineChartProps> = ({ price }) => {
  const data = randomData(price);
  const highValue = Math.max(...data.map(item => item.close));
  const lowValue = Math.min(...data.map(item => item.close));

  const isLowValue = useCallback(
    (value: number) => value === lowValue,
    [lowValue],
  );

  const needShowLabel = useCallback(
    (value: number) => value === highValue || value === lowValue,
    [highValue, lowValue],
  );

  return (
    <VictoryChart
      domainPadding={{ y: 30 }}
      padding={{ bottom: 40, top: 20, left: 0, right: 0 }}
      theme={VictoryTheme.material}>
      <VictoryLine
        animate={{ duration: 2000, onLoad: { duration: 1000 } }}
        data={data}
        style={{
          data: { stroke: themeColor.background.secondary, strokeWidth: 3 }, // Azul para apertura
        }}
        x="day"
        y="close"
      />
      <VictoryAxis dependentAxis={false} style={{ grid: { strokeWidth: 0 } }} />
      <VictoryScatter
        data={data}
        labelComponent={
          <VictoryLabel
            dy={({ datum }) => (isLowValue(datum.close) ? 20 : -20)}
          />
        }
        labels={({ datum }) =>
          datum.close === highValue || datum.close === lowValue
            ? `${formatNumberToLocale(datum.close)}`
            : ''
        }
        size={4}
        style={{
          data: {
            fill: ({ datum }) =>
              needShowLabel(datum.close)
                ? themeColor.background.secondary
                : 'transparent',
          },
        }}
        x="day"
        y="close"
      />
    </VictoryChart>
  );
};

const Icon = styled(FastImage)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const SymbolText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.text.tertiary};
`;

const Title: FC<Cryptocurrency> = ({ id, name, symbol }) => (
  <Row alignItems="center" gap={8} style={{ flex: 1 }}>
    <Icon
      resizeMode={FastImage.resizeMode.contain}
      source={{
        uri: `${URI_ICON}${id}.png`,
      }}
    />
    <Row alignItems="center" gap={4}>
      <TitleText>{name}</TitleText>
      <SymbolText>({symbol})</SymbolText>
    </Row>
  </Row>
);

type DataRowProps = {
  label: string;
  value: string;
};

const LabelText = styled(Text)`
  font-size: 14px;
  flex: 1;
  color: ${({ theme }) => theme.text.secondary};
`;

const ValueText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const DataRow: FC<DataRowProps> = ({ label, value }) => (
  <Row>
    <LabelText>{label}</LabelText>
    <ValueText>{value}</ValueText>
  </Row>
);

const Layout = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background.primary};
`;

const Wrapper = styled(View)<{ gap?: number }>`
  padding-left: 16px;
  padding-right: 16px;
  gap: ${({ gap }) => gap || '0'}px;
`;

const TitlePrice = styled(Text)`
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 500;
`;

const PercentChangeText = styled(Text)<{ isNegative: boolean }>`
  font-size: 16px;
  color: ${({ isNegative, theme }) =>
    isNegative ? theme.text.negative : theme.text.positive};
  font-weight: 500;
`;

const WrapperData = styled(View)`
  flex: 1;
  gap: 12px;
  background-color: ${({ theme }) => theme.background.tertiary};
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
`;

const Detail: SC<'Detail'> = ({
  route: {
    params: { currency },
  },
}) => {
  const { USD } = currency.quote;
  const { getCurrencyById } = useApi();
  const { data, isFetching, refetch } = useQuery(
    ['currency', currency.id],
    () => getCurrencyById(currency.id),
    {
      refetchInterval: REFRESH_INTERVAL,
    },
  );

  const updatedData = useMemo(() => {
    if (data) return data[currency.id];
    return currency;
  }, [currency, data]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <Layout>
      <StatusBar />
      <Header title={<Title {...currency} />} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }>
        <Wrapper>
          <Row alignItems="center" gap={8}>
            <TitlePrice>
              ${formatNumberToLocale(updatedData.quote.USD.price)}
            </TitlePrice>
            <PercentChangeText isNegative={USD.percent_change_24h < 0}>
              ({formatNumberToLocale(USD.percent_change_24h)}%)
            </PercentChangeText>
          </Row>
        </Wrapper>
        <LineChart price={USD.price} />
        <Spacer orientation="vertical" size={16} />
        <WrapperData>
          <DataRow
            label="Market Cap"
            value={`$${formatNumberToLocale(USD.market_cap)}`}
          />
          <DataRow
            label="Volume 24h"
            value={`$${formatNumberToLocale(USD.volume_24h)}`}
          />
          <DataRow
            label="Circulating Supply"
            value={formatNumberToLocale(currency.circulating_supply)}
          />
          <DataRow
            label="Total Supply"
            value={formatNumberToLocale(currency.total_supply)}
          />
          {currency.max_supply && (
            <DataRow
              label="Max Supply"
              value={formatNumberToLocale(currency.max_supply)}
            />
          )}
        </WrapperData>
      </ScrollView>
    </Layout>
  );
};

export { Detail };
