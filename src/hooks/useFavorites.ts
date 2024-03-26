import { useCallback } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { useUser } from './useUser';
import { storage } from '../../storage';

const useFavorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useMMKVObject<string[]>(
    `favorite${user?.id}`,
    storage,
  );

  const add = useCallback(
    (symbol: string) => {
      const newFavorites = [...(favorites || []), symbol];
      setFavorites(newFavorites);
    },
    [favorites, setFavorites],
  );

  const isFavorite = (symbol: string) => favorites?.includes(symbol);

  const remove = useCallback(
    (symbol: string) => {
      const newFavorites = favorites?.filter(item => item !== symbol);
      setFavorites(newFavorites);
    },
    [favorites, setFavorites],
  );

  return { favorites: favorites || [], add, remove, isFavorite };
};

export { useFavorites };
