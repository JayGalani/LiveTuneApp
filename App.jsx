import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './reducer/redux/favoriteSlice';
import AudioProcessor from './src/AudioProcessor/AudioProcessor';
import {View} from 'react-native';

const store = configureStore({reducer: {favorites: favoritesReducer}});

const App = () => {
  return (
    <Provider store={store}>
      <AudioProcessor />
    </Provider>
  );
};

export default App;
