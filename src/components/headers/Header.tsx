import { FC, ReactNode, useCallback } from 'react';
import { Pressable, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomNavigation } from 'navigation/types';
import styled from 'styled-components/native';
import BackIcon from '../../../assets/icons/back-arrow.svg';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
`;

type HeaderProps = {
  title: ReactNode;
};

const Header: FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<CustomNavigation>();
  const renderTitle = useCallback(() => {
    if (typeof title === 'string') {
      return <Text>{title}</Text>;
    }

    return title;
  }, [title]);

  return (
    <Wrapper>
      <Pressable
        testID="header-go-back-btn"
        onPress={() => navigation.goBack()}>
        <BackIcon height={24} width={24} />
      </Pressable>
      {renderTitle()}
    </Wrapper>
  );
};

export { Header };
