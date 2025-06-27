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
    TextInput,
} from 'react-native';
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import HeartSvg from '../svg/HeartSvg';
import HeartFillSvg from '../svg/HeartFillSvg';
import BackSvg from '../svg/BackSvg';
import SearchSvg from '../svg/SearchSvg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';

const data = [
    { id: 1, type: 'Category' },
    { id: 2, type: 'Brand' },
    { id: 3, type: 'Price' },
];

const search = [
    { id: 1, type: 'All' },
    { id: 2, type: 'Audio' },
    { id: 3, type: 'Drones + Electronics' },
    { id: 4, type: 'Photo + Video' },
    { id: 5, type: 'Gaming + VR' },
    { id: 6, type: 'Networking' },
    { id: 7, type: 'Notebooks + PCS' },
    { id: 8, type: 'PC Components' },
    { id: 9, type: 'Peripherals' },
    { id: 10, type: 'Smartphones + Tablets' },
    { id: 11, type: 'Software solutions' },
    { id: 12, type: 'TV + Home cinema' },

];

const { width } = Dimensions.get('window');

export default function BrowseScreen() {
    const navigation = useNavigation()
    const [selectedId, setSelectedId] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [favorites, setFavorites] = useState({});
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(search);
    useFocusEffect(
        React.useCallback(() => {
            // When the screen is focused
            return () => {
                // When the screen is unfocused (navigated away)
                setSearchModalVisible(false);
            };
        }, [])
    );
    
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
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const toggleFavorite = (product) => {
        if (favorites[product.id]) {
          dispatch(removeFavorite(product.id));
        } else {
          dispatch(addFavorite(product));
        }
      };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = search.filter((item) =>
            item.type.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <View style={[styles.container, { paddingTop: responsiveHeight(1.5) }]}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: responsiveWidth(4),
                    paddingBottom: responsiveHeight(1.8),
                }}
            >
                <BackSvg />
                <Text
                    style={{
                        color: '#000',
                        fontSize: responsiveFontSize(2.6),
                        fontWeight: '600'
                    }}
                >
                    Products
                </Text>
                <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
                    <SearchSvg />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(6),
                    height: responsiveHeight(10)
                }}
                renderItem={({ item }) => {
                    const isSelected = item.id === selectedId;
                    return (
                        <TouchableOpacity style={styles.itemContainer}>
                            <Text style={[styles.itemText]}>
                                {item.type}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

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

                renderItem={({ item }) =>  {
                    const isFavorite = Boolean(favorites[item.id]);

                    return(
                    
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    >
                        {/* <TouchableOpacity
                            style={styles.favoriteIcon}
                            onPress={() => {
                                setFavorites((prev) => ({
                                    ...prev,
                                    [item.id]: !prev[item.id],
                                }));
                            }}
                        >
                            {favorites[item.id] ? <HeartFillSvg /> : <HeartSvg />}
                        </TouchableOpacity> */}
                        <TouchableOpacity
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
                )}}
                
                // renderItem={({ item }) => (
                //     <View style={styles.card}>
                //         <TouchableOpacity
                //             style={styles.favoriteIcon}
                //             onPress={() => {
                //                 setFavorites((prev) => ({
                //                     ...prev,
                //                     [item.id]: !prev[item.id],
                //                 }));
                //             }}
                //         >
                //             {favorites[item.id] ? <HeartFillSvg /> : <HeartSvg />}
                //         </TouchableOpacity>

                //         <Image source={{ uri: item.image }} style={styles.productImage} />
                //         <Text style={styles.title} numberOfLines={2}>
                //             {item.title}
                //         </Text>
                //         <Text style={styles.price}>${item.price}</Text>
                //     </View>
                // )}
            />

            {/* Search Modal */}
            {searchModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalHeader}>
                       
                         <View style={styles.searchInputWrapper}>
        <TextInput
            placeholder="Search..."
            style={styles.searchInputWithRightIcon}
            value={searchQuery}
            onChangeText={handleSearch}
            // autoFocus
            placeholderTextColor="#888"
        />
        <View style={styles.searchIconRight}>
            <SearchSvg />
        </View>
    </View>
                    </View>
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => {
                                    setSearchModalVisible(false);
                                    // Optionally perform an action on select
                                }}
                            >
                                <Text style={styles.modalItemText}>{item.type}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        width: width,
    },
    itemContainer: {
        marginRight: responsiveWidth(6),
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(30),
        height: responsiveHeight(6),
        borderRadius: 10,
        backgroundColor: "#fff",
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    itemText: {
        color: '#000',
        fontSize: responsiveFontSize(2.4),
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
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        paddingTop: responsiveHeight(6),
        zIndex: 999,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flex: 1,
        height: 40,
        marginRight: 10,
        paddingHorizontal: 10,
        position: 'relative',
    },
    
    searchInputWithRightIcon: {
        flex: 1,
        fontSize: responsiveFontSize(2),
        color: '#000',
        paddingRight: 35, // space for the icon
        paddingVertical: 0,
    },
    
    searchIconRight: {
        position: 'absolute',
        right: 15,
    },
    
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(4),
        paddingBottom: responsiveHeight(2),
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize: responsiveFontSize(2),
        backgroundColor: '#f5f5f5',
    },
    cancelText: {
        color: '#007BFF',
        fontSize: responsiveFontSize(2),
    },
    modalItem: {
        paddingVertical: 15,
        paddingHorizontal: responsiveWidth(6),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalItemText: {
        fontSize: responsiveFontSize(2.2),
        color: '#333',
    },
});
