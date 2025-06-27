import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
          <View style={{ padding: 10 }}>
            <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
