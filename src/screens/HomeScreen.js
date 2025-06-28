import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import HeartSvg from '../svg/HeartSvg';
import HeartFillSvg from '../svg/HeartFillSvg';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, type: 'All' },
  { id: 2, type: 'Audio' },
  { id: 3, type: 'Drones + Electronics' },
  { id: 4, type: 'Photo + Video' },
];

const images = [
  {
    id: '1',
    uri: 'https://www.shutterstock.com/image-vector/creating-brand-identity-ecommerce-website-260nw-639449524.jpg',
  },
  {
    id: '2',
    uri: 'https://static.vecteezy.com/system/resources/thumbnails/049/858/756/small/this-futuristic-online-shopping-concept-features-a-digital-cart-integrated-with-advanced-technology-elements-photo.jpg',
  },
  {
    id: '3',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlIkEXC6t3j8bYdflNxbEqlhMc15BCFwgvQ&s',
  },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedId, setSelectedId] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const toggleFavorite = (product) => {
    if (favorites[product.id]) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: responsiveHeight(1.5) }]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.text}>Hello Guest</Text>

      {/* Categories */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(1),
          paddingHorizontal: responsiveWidth(6),
        }}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;
          return (
            <TouchableOpacity
              onPress={() => setSelectedId(item.id)}
              style={styles.itemContainer}
            >
              <Text style={[styles.itemText, isSelected && styles.selectedText]}>
                {item.type}
              </Text>
              {isSelected && <View style={styles.underline} />}
            </TouchableOpacity>
          );
        }}
      />

      {/* Carousel */}
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.carouselImage} />
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <Text style={styles.sectionLink}>See all</Text>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(6),
          paddingBottom: responsiveHeight(10),
          paddingTop: responsiveHeight(2),
        }}
        renderItem={({ item }) => {
          const isFavorite = Boolean(favorites[item.id]);

          return (
            <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => toggleFavorite(item)}
              >
                {isFavorite ? <HeartFillSvg /> : <HeartSvg />}
              </TouchableOpacity>

              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: responsiveFontSize(2.8),
    fontWeight: '600',
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(6),
  },
  itemContainer: {
    marginRight: responsiveWidth(6),
    alignItems: 'center',
  },
  itemText: {
    color: '#999',
    fontSize: responsiveFontSize(2.4),
  },
  selectedText: {
    color: '#000',
    fontWeight: '700',
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  carouselImage: {
    width: width * 0.88,
    height: 250,
    resizeMode: 'cover',
    marginHorizontal: responsiveWidth(6),
    marginTop: responsiveHeight(2),
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(6),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.8),
    color: '#000',
    fontWeight: '600',
  },
  sectionLink: {
    color: 'grey',
    fontSize: responsiveFontSize(1.8),
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%',
    elevation: 2,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: responsiveWidth(0.2),
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
});
