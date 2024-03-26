import React, { FunctionComponent, PropsWithChildren } from 'react';

import { NavigationContext } from '@react-navigation/native';
import { MockSafeAreaContext, MockSafeAreaContextProps } from './MockSafeArea';
import { MockThemeProvider } from './MockThemeProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockNavigationProps: any = {
  navigate: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  isFocused: () => true,
  addListener: jest.fn(() => () => ({ remove: jest.fn() })),
};

type MockNavigationProps = PropsWithChildren<MockSafeAreaContextProps>;

const MockNavigation: FunctionComponent<MockNavigationProps> = ({
  children,
  initialWindowMetrics,
}) => (
  <MockSafeAreaContext initialWindowMetrics={initialWindowMetrics}>
    <NavigationContext.Provider value={mockNavigationProps}>
      <MockThemeProvider>{children}</MockThemeProvider>
    </NavigationContext.Provider>
  </MockSafeAreaContext>
);

export { MockNavigation, mockNavigationProps };
