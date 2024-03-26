import React, { FC, PropsWithChildren } from 'react';

import { Metrics, SafeAreaProvider } from 'react-native-safe-area-context';

const MOCK_INITIAL_METRICS: Metrics = {
  frame: {
    width: 320,
    height: 640,
    x: 0,
    y: 0,
  },
  insets: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
};

type MockSafeAreaContextProps = {
  initialWindowMetrics?: Metrics | null;
};

const MockSafeAreaContext: FC<PropsWithChildren<MockSafeAreaContextProps>> = ({
  children,
  initialWindowMetrics,
}) => (
  <SafeAreaProvider
    initialMetrics={initialWindowMetrics || MOCK_INITIAL_METRICS}>
    {children}
  </SafeAreaProvider>
);

export { MockSafeAreaContext };
export type { MockSafeAreaContextProps };
