import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ThreeDotSvg from '../svg/ThreeDotSvg';
import AddToCartSvg from '../svg/AddToCartSvg';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { addToCart } from '../redux/cartSlice';
const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items); // <-- access cart items

  const favoriteItems = Object.values(favorites);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (cartItems[item.id]) {
      Alert.alert('Already in Cart', 'This product is already in your cart.');
    } else {
      dispatch(addToCart(item));
    }
  };

  if (favoriteItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites added yet!</Text>
      </View>
    );
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Product Image */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Info + Icons */}
            <View style={styles.detailsContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.price}>${item.price}</Text>

                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleAddToCart(item)}>
                  <AddToCartSvg />
                </TouchableOpacity>

                <ThreeDotSvg />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  emptyText: {
    fontSize: responsiveFontSize(2),
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(22),
    height: responsiveHeight(12),
    resizeMode: 'contain',
    marginRight: 12,
  },
  detailsContainer: {
    // flex: 1,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor:'yellow',
    width: width * 0.6
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
    width: width * 0.7
  },
  title: {
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: responsiveFontSize(1.8),
    color: 'green',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // gap: 10,
    // backgroundColor:'red'
  },
});
