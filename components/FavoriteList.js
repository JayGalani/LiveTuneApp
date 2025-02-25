import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const FavoritesList = () => {
  const favoriteSongs = useSelector(state => state.favorites.songs);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Songs</Text>
      {favoriteSongs.length === 0 ? (
        <Text style={styles.empty}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favoriteSongs}
          contentContainerStyle={{height: '50%', alignSelf: 'center'}}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text style={styles.song}>
              {item.title} - {item.artist}
            </Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  song: {
    fontSize: 16,
    paddingVertical: 5,
  },
  empty: {
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default FavoritesList;
