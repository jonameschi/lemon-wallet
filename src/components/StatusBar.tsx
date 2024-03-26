import { FC } from 'react';
import { View, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { theme as themeColor } from 'theme/theme';

const FakeStatusBar = styled(View)<{ height: number }>`
  position: absolute;
  height: ${({ height }) => height}px;
  width: 100%;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const StatusBar: FC = () => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <RNStatusBar
        backgroundColor={themeColor.background.secondary}
        barStyle="light-content"
      />
      <FakeStatusBar height={top} />
    </>
  );
};

export { StatusBar };
