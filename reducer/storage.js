import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorite_songs';

export const getStoredFavorites = async () => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = async favorites => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
