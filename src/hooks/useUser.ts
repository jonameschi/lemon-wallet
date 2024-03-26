import { useCallback } from 'react';
import { User } from '@react-native-google-signin/google-signin';
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from '../../storage';

type UserInfo = User['user'];

const useUser = () => {
  const [user, setUser] = useMMKVObject<UserInfo>('user', storage);

  const set = useCallback(
    (userInfo: User['user']) => {
      setUser(userInfo);
    },
    [setUser],
  );

  const clear = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

  return {
    set,
    clear,
    user,
  };
};

export { useUser };
