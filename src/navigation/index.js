import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Search, PlusCircle, Activity, Settings } from 'lucide-react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import SellScreen from '../screens/SellScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BrowseScreen, ActivityScreen } from '../screens/PlaceholderScreens';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.text,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    borderTopColor: COLORS.border,
                    backgroundColor: COLORS.background,
                    paddingTop: 5,
                },
                tabBarIcon: ({ color, size }) => {
                    let IconComponent;
                    if (route.name === 'Home') IconComponent = Home;
                    else if (route.name === 'Browse') IconComponent = Search;
                    else if (route.name === 'Sell') IconComponent = PlusCircle;
                    else if (route.name === 'Activity') IconComponent = Activity;
                    else if (route.name === 'Settings') IconComponent = Settings;
                    return <IconComponent color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Browse" component={BrowseScreen} />
            <Tab.Screen name="Sell" component={SellScreen} />
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen
                    name="LiveStream"
                    component={LiveScreen}
                    options={{ presentation: 'fullScreenModal' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
