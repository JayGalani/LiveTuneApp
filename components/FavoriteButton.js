import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../reducer/redux/favoriteSlice';

const FavoriteButton = ({song}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.songs);
  const isFavorite = favorites.some(fav => fav.id === song.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(song.id));
    } else {
      dispatch(addFavorite(song));
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isFavorite ? styles.active : null]}
      onPress={toggleFavorite}>
      <Text style={styles.text}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#ccc',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FavoriteButton;
