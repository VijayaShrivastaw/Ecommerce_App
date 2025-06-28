import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

// Screens
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Custom SVG icons
import HomeSvg from '../svg/HomeSvg';
import SearchSvg from '../svg/SearchSvg';
import FavSvg from '../svg/FavSvg';
import AddToCartSvg from '../svg/AddToCartSvg';
import ProfileSvg from '../svg/ProfileSvg';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            // Use SVGs directly for each route
            switch (route.name) {
              case 'Home':
                return <HomeSvg width={size} height={size} fill={color} />;
              case 'Browse':
                return <SearchSvg width={size} height={size} fill={color} />;
              case 'Favourites':
                return <FavSvg width={size}  fill={color} />;
              case 'Cart':
                return <AddToCartSvg width={size} height={size} fill={color} />;
              case 'Profile':
                return <ProfileSvg width={size} height={size} fill={color} />;
              default:
                return null;
            }
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: responsiveHeight(10),
            paddingBottom: 10,
            paddingTop: 10,
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
