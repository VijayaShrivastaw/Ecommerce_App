import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import HeartSvg from '../svg/HeartSvg';
import HeartFillSvg from '../svg/HeartFillSvg';
import AddToCartSvg from '../svg/AddToCartSvg';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { addToCart } from '../redux/cartSlice';

export default function ProductDetailScreen({ route }) {
  
  const { product } = route.params;
  // const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items); // <-- access cart items

  console.log(favorites,'favorites')
  const toggleFavorite = (product) => {
      if (favorites[product.id]) {
        dispatch(removeFavorite(product.id));
      } else {
        dispatch(addFavorite(product));
      }
    };
    const isFavorite = Boolean(favorites[product.id]);
    const handleAddToCart = (item) => {
      if (cartItems[item.id]) {
        Alert.alert('Already in Cart', 'This product is already in your cart.');
      } else {
        dispatch(addToCart(item));
      }
    };
    
  return (
    <View style={styles.container}>
    <View>
    <Image source={{ uri: product.image }} style={styles.image} />
     <View style={{
      position:'absolute',
      top:responsiveHeight(25),
      right:responsiveWidth(0)
     }}>
     <TouchableOpacity
        style={styles.favoriteIcon}
        // onPress={() => setIsFavorite(!isFavorite)}
        onPress={() => toggleFavorite(product)}

      >
                {isFavorite ? <HeartFillSvg /> : <HeartSvg />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAddToCart(product)}>

      <AddToCartSvg />
      </TouchableOpacity>
     </View>
    </View>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, color: 'green', marginBottom: 10 },
  description: { fontSize: 16, color: '#333' },
});
