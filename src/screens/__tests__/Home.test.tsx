import React from 'react';
import { useUser } from '@hooks';
import { Home } from '@screens';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { CustomScreenRouteProps } from 'navigation/types';

import { currenciesData, userData } from '../../../__mocks__/mockData';
import {
  MockNavigation,
  mockNavigationProps,
} from '../../../__mocks__/MockNavigation';

jest.mock('@hooks/useUser', () => ({
  useUser: jest.fn(),
}));
const useUserMock = useUser as jest.MockedFunction<typeof useUser>;
const clearMockFn = jest.fn();
useUserMock.mockImplementation(() => ({
  user: userData.user,
  set: jest.fn(),
  clear: clearMockFn,
}));

const mockData = { data: currenciesData, isLoading: false };
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => mockData,
}));

const mockRoute: CustomScreenRouteProps<'Home'> = {
  key: 'Home',
  name: 'Home',
};
const renderScreen = () =>
  render(
    <MockNavigation>
      <Home navigation={mockNavigationProps} route={mockRoute} />
    </MockNavigation>,
  );

const mockAdd = jest.fn();
const mockRemove = jest.fn();
jest.mock('@hooks/useFavorites', () => ({
  useFavorites: () => ({
    add: mockAdd,
    favorites: [],
    remove: mockRemove,
    isFavorite: jest.fn(symbol => symbol === 'ETH'),
  }),
}));

describe('Home Screen', () => {
  it('should render a snapshot with data', () => {
    const { toJSON } = renderScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot without data and loading true', () => {
    mockData.isLoading = true;

    const { toJSON } = renderScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should execute search when SearchText change', () => {
    const { getByTestId, getByText } = renderScreen();
    fireEvent.changeText(getByTestId('search-input-input'), 'BTC');
    expect(getByTestId('search-input-input').props.value).toBe('BTC');
    expect(getByText('Bitcoin')).toBeTruthy();
  });

  it('should navigate when Item press', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Bitcoin'));
    expect(mockNavigationProps.navigate).toHaveBeenCalledWith('Detail', {
      currency: currenciesData[0],
    });
  });

  it('should add favorite when Star Press', async () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId(`star-${currenciesData[0].id}-btn`));

    expect(mockAdd).toHaveBeenCalledWith(currenciesData[0].symbol);
  });

  it('should remove favorite when Star Press', async () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId(`star-${currenciesData[1].id}-btn`));
    expect(mockRemove).toHaveBeenCalledWith(currenciesData[1].symbol);
  });

  it('should toggle favorites when Toggle press', () => {
    const { getByTestId, getByText, queryByText } = renderScreen();
    fireEvent.press(getByTestId('toggle-favorite'));
    expect(getByText('Ethereum')).toBeTruthy();
    expect(queryByText('Bitcon')).toBeNull();
  });

  it('should toggle favorites when Toggle press and enter a criteria in search input', () => {
    const { getByTestId, queryByText } = renderScreen();
    fireEvent.press(getByTestId('toggle-favorite'));
    fireEvent.changeText(getByTestId('search-input-input'), 'Bitcoin');
    expect(queryByText('Ethereum')).toBeNull();
  });

  it('should logout and navigate to Login when Logout press', async () => {
    const { getByTestId } = renderScreen();
    fireEvent.press(getByTestId('logout-btn'));

    await waitFor(() => {
      expect(clearMockFn).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigationProps.navigate).toHaveBeenCalledWith('Login');
  });
});
