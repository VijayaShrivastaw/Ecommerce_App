// App.js or Navigation.js
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import CartScreen from '../screens/CartScreen';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      switch (route.name) {
        case 'Home':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'Browse':
          iconName = focused ? 'search' : 'search-outline';
          break;
        case 'Favourites':
          iconName = focused ? 'heart' : 'heart-outline';
          break;
        case 'Cart':
          iconName = focused ? 'cart' : 'cart-outline';
          break;
        case 'Profile':
          iconName = focused ? 'person' : 'person-outline';
          break;
      }

      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      height: responsiveHeight(10), // ✅ change this value as needed
      paddingBottom: 10, // optional: space for icon/text
      paddingTop: 10, // optional: space for icons to center vertically
    },
    tabBarLabelStyle: {
      fontSize: 12,
    },
  })}
>

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Browse" component={BrowseScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
