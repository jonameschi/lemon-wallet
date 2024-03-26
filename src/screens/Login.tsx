import { useCallback, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Col } from '@components';
import { useUser } from '@hooks';
import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Config } from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { SC } from '../navigation/types';

type GoogleSigninError = {
  code?: (typeof statusCodes)[keyof typeof statusCodes];
};

const Layout = styled(SafeAreaView)`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const TitleText = styled(Text)`
  font-size: 48px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text.inversed};
`;

const UsersText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text.inversed};
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const Button = styled(View)<{ pressed: boolean }>`
  border-radius: 36px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: ${({ pressed, theme }) =>
    pressed ? theme.background.inversed : theme.background.tertiary};
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
`;

GoogleSignin.configure({
  webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID_WEB,
  iosClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID_IOS,
  scopes: ['profile', 'email'],
});

const Login: SC<'Login'> = ({ navigation }) => {
  const { t } = useTranslation('app', { keyPrefix: 'screens.login' });
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const { set } = useUser();

  const navigateToHome = useCallback(
    (user: User['user']) => {
      set(user);
      setTimeout(() => setSigningIn(false), 200);
      navigation.navigate('Home');
    },
    [navigation, set],
  );

  const getCurrentUser = useCallback(async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const userInfo = await GoogleSignin.signInSilently();
      if (userInfo.idToken) {
        navigateToHome(userInfo.user);
        return;
      }
    }
    setShowLoginButton(true);
  }, [navigateToHome]);

  useFocusEffect(
    useCallback(() => {
      getCurrentUser();
    }, [getCurrentUser]),
  );

  const signIn = useCallback(async () => {
    try {
      setSigningIn(true);
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      navigateToHome(user);
    } catch (error) {
      setSigningIn(false);
      const typedError = error as GoogleSigninError;
      if (typedError.code === statusCodes.SIGN_IN_CANCELLED) {
        // eslint-disable-next-line no-console
        console.error('Cancel');
      } else if (typedError.code === statusCodes.IN_PROGRESS) {
        // eslint-disable-next-line no-console
        console.error('Signin in progress');
      } else if (typedError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // eslint-disable-next-line no-console
        console.error('PLAY_SERVICES_NOT_AVAILABLE');
      }
    }
  }, [navigateToHome]);

  return (
    <Layout>
      <Image
        resizeMode="contain"
        source={require('../../assets/images/logo.png')}
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
        }}
      />
      <Col gap={24}>
        <TitleText>{t('title')}</TitleText>
        <UsersText>{t('cantUsers')}</UsersText>
      </Col>
      {showLoginButton && (
        <Pressable disabled={signingIn} onPress={signIn}>
          {({ pressed }) => (
            <Button pressed={pressed}>
              <ButtonText>{t('login')}</ButtonText>
            </Button>
          )}
        </Pressable>
      )}
    </Layout>
  );
};

export { Login };
