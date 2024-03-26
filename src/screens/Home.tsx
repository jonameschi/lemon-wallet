import { FC, useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Cryptocurrency, useApi } from '@api';
import {
  Col,
  KeyboardAwareScrollView,
  MainHeader,
  Row,
  SearchText,
  Spacer,
  StatusBar,
  Toggle,
} from '@components';
import { useFavorites } from '@hooks';
import { formatNumberToLocale } from 'helpers/helper';
import { SC } from 'navigation/types';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import StarIcon from '../../assets/icons/newstar.svg';
import { theme as themeColor } from '../theme/theme';

const REFRESH_INTERVAL = 30000;

const URI_ICON = 'https://s2.coinmarketcap.com/static/img/coins/64x64/';

const WrapperItem = styled(View)<{ pressed: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  background-color: ${({ pressed, theme }) =>
    pressed ? theme.background.inversed : theme.background.tertiary};
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
`;

const PressableItem = styled(Pressable)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
`;

const TitleSymbol = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.text.tertiary};
`;

const TitlePrice = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
  text-align: right;
`;

const PercentChangeText = styled(Text)<{ isNegative: boolean }>`
  font-size: 12px;
  color: ${({ isNegative, theme }) =>
    isNegative ? theme.text.negative : theme.text.positive};
  font-weight: 500;
  text-align: right;
`;

const Icon = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const WrapperToggle = styled(View)`
  padding-right: 20px;
  justify-content: center;
  align-items: flex-end;
`;

const OnlyFavoritesText = styled(Text)`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 12px;
`;

const Layout = styled(View)`
  background-color: ${({ theme }) => theme.background.primary};
  flex: 1;
`;

type ItemProps = Cryptocurrency & {
  onPress: () => void;
};
const Item: FC<ItemProps> = ({ id, name, onPress, quote: { USD }, symbol }) => {
  const { add, isFavorite, remove } = useFavorites();

  const isActive = useMemo(() => isFavorite(symbol), [isFavorite, symbol]);

  const handleFavoritePress = useCallback(() => {
    if (isActive) {
      remove(symbol);
    } else {
      add(symbol);
    }
  }, [add, isActive, remove, symbol]);

  return (
    <PressableItem onPress={onPress}>
      {({ pressed }) => (
        <WrapperItem pressed={pressed}>
          <Icon
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: `${URI_ICON}${id}.png`,
            }}
          />
          <Col gap={2} justifyContent="center">
            <TitleText>{name}</TitleText>
            <TitleSymbol>{symbol}</TitleSymbol>
          </Col>
          <Col gap={2} justifyContent="center">
            <TitlePrice>${formatNumberToLocale(USD.price)}</TitlePrice>
            <PercentChangeText isNegative={USD.percent_change_24h < 0}>
              {USD.percent_change_24h >= 0 ? '+' : ''}
              {formatNumberToLocale(USD.percent_change_24h)}%
            </PercentChangeText>
          </Col>
          <Pressable testID={`star-${id}-btn`} onPress={handleFavoritePress}>
            <StarIcon
              fill={
                isActive ? themeColor.text.warning : themeColor.text.tertiary
              }
              height={24}
              width={24}
            />
          </Pressable>
        </WrapperItem>
      )}
    </PressableItem>
  );
};

const matchesFilterCriteria = (item: Cryptocurrency, criteria: string) => {
  if (!criteria) return true;
  const lowerCaseCriteria = criteria.toLowerCase();
  return (
    item.name.toLowerCase().includes(lowerCaseCriteria) ||
    item.symbol.toLowerCase().includes(lowerCaseCriteria)
  );
};

const Home: SC<'Home'> = ({ navigation }) => {
  const [filterCriteria, setFilterCriteria] = useState<string>('');
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const { isFavorite } = useFavorites();
  const { t } = useTranslation('app', { keyPrefix: 'screens.home' });

  const { getCurrencies } = useApi();
  const { data } = useQuery('currencies', getCurrencies, {
    refetchInterval: REFRESH_INTERVAL,
  });
  const { bottom } = useSafeAreaInsets();

  const matchesFavorites = useCallback(
    (item: Cryptocurrency) => !filterFavorites || isFavorite(item.symbol),
    [filterFavorites, isFavorite],
  );

  const filteredData = useMemo(
    () =>
      data?.filter(
        item =>
          matchesFilterCriteria(item, filterCriteria) && matchesFavorites(item),
      ),
    [data, filterCriteria, matchesFavorites],
  );

  return (
    <Layout>
      <StatusBar />
      <MainHeader />
      <Row alignItems="center" gap={12}>
        <SearchText
          placeholder={t('search')}
          testID="search-input"
          onChangeText={setFilterCriteria}
        />
        <WrapperToggle>
          <Toggle
            testID="toggle-favorite"
            value={filterFavorites}
            onChange={setFilterFavorites}
          />
          <OnlyFavoritesText>{t('favorites')}</OnlyFavoritesText>
        </WrapperToggle>
      </Row>
      <KeyboardAwareScrollView
        hideWhenScrollContent
        keyboardShouldPersistTaps="never">
        <ScrollView
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}>
          {filteredData?.map(item => (
            <Item
              key={item.id}
              {...item}
              onPress={() => navigation.navigate('Detail', { currency: item })}
            />
          ))}
          <Spacer orientation="vertical" size={bottom} />
        </ScrollView>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export { Home };
