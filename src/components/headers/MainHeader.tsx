import { FC, useCallback, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Row } from '@components';
import { useUser } from '@hooks';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { CustomNavigation } from 'navigation/types';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

type WrapperProps = {
  paddingTop: number;
};

const Wrapper = styled(View)<WrapperProps>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  height: ${({ paddingTop }) => 80 + paddingTop}px;
  box-shadow: 0px 2px 4px rgba(23, 108, 232, 0.175);
`;

const HelloText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.text.inversed};
  font-weight: 600;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const Button = styled(View)<{ pressed: boolean }>`
  width: 150px;
  border-radius: 36px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${({ pressed, theme }) =>
    pressed ? theme.background.inversed : theme.background.tertiary};
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
`;

const WrapperImage = styled(FastImage)`
  border-radius: 20px;
  width: 40px;
  height: 40px;
`;

const MainHeader: FC = () => {
  const { t } = useTranslation('app', { keyPrefix: 'components.mainHeader' });
  const { top } = useSafeAreaInsets();
  const { clear, user } = useUser();
  const navigation = useNavigation<CustomNavigation>();

  const safeTop = useMemo(() => (top === 0 ? 10 : top), [top]);

  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      clear();
      navigation.navigate('Login');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [clear, navigation]);

  return (
    <Wrapper paddingTop={safeTop}>
      <Row alignItems="center" gap={10}>
        {user?.photo && <WrapperImage source={{ uri: user.photo }} />}
        <HelloText>{t('welcome', { name: user?.name })}</HelloText>
      </Row>
      <Row justifyContent="flex-end">
        <Pressable testID="logout-btn" onPress={signOut}>
          {({ pressed }) => (
            <Button pressed={pressed}>
              <ButtonText>{t('logout')}</ButtonText>
            </Button>
          )}
        </Pressable>
      </Row>
    </Wrapper>
  );
};

export { MainHeader };
