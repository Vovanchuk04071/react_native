import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DefaultScreenPosts from '../nestedScreens/DefaultScreenposts';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

const PostsScree = () => {

    return (
        <NestedScreen.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <NestedScreen.Screen name="DefaultPostsScreen" component={DefaultScreenPosts}/>
            <NestedScreen.Screen name="Comments" component={CommentsScreen}/>
            <NestedScreen.Screen name="Map" component={MapScreen}/>
        </NestedScreen.Navigator>
    );
};

export default PostsScree;
