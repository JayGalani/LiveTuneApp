import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorite_songs';

const loadFavorites = async () => {
  const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const saveFavorites = async favorites => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {songs: []},
  reducers: {
    setFavorites: (state, action) => {
      state.songs = action.payload;
    },
    addFavorite: (state, action) => {
      state.songs.push(action.payload);
      saveFavorites(state.songs);
    },
    removeFavorite: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      saveFavorites(state.songs);
    },
  },
});

export const {setFavorites, addFavorite, removeFavorite} =
  favoritesSlice.actions;

export const initializeFavorites = () => async dispatch => {
  const favorites = await loadFavorites();
  dispatch(setFavorites(favorites));
};

export default favoritesSlice.reducer;
