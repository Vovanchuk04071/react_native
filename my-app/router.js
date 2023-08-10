import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import PostsScreen from './screens/mainScreen/PostsScreen';
import CreateScreen from './screens/mainScreen/CreateScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';

import {Octicons, Feather} from '@expo/vector-icons';

export const useRoute = isAuth => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Login"
                    component={LoginScreen}
                />
                <AuthStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Register"
                    component={RegisterScreen}
                />
            </AuthStack.Navigator>
        );
    }
    return (
        <MainTab.Navigator screenOptions={{
            tabBarShowLabel: false,
        }}>
            <MainTab.Screen
                options={{
                    tabBarIcon: ({focused, size, color}) => (
                        <Octicons name="apps" size={size} color={color}/>
                    ),
                }}
                name="Posts"
                component={PostsScreen}
            />
            <MainTab.Screen
                options={{
                    tabBarIcon: ({focused, size, color}) => (
                        <Feather name="plus" size={size} color={color}/>
                    ),
                }}
                name="Create"
                component={CreateScreen}
            />
            <MainTab.Screen
                options={{
                    tabBarIcon: ({focused, size, color}) => (
                        <Feather name="user" size={size} color={color}/>
                    ),
                }}
                name="Profile"
                component={ProfileScreen}
            />
        </MainTab.Navigator>
    );
};
