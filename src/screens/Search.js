import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const search = [
  { id: 1, type: 'All' },
  { id: 2, type: 'Audio' },
  { id: 3, type: 'Drones + Electronics' },
  { id: 4, type: 'Photo + Video' },
];

const Search = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.type}</Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={search}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
});

export default Search;
