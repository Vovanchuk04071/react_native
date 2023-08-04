import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MapScreen from '../nestedScreens/MapScreen';

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);

  React.useEffect(() => {
    if (route.params?.photo) {
      setPosts([...posts, route.params.photo]);
    }

    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.photo]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View>
            <Image source={{ uri: item.item.uri }} style={styles.imageContainer}></Image>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
        <Text>Comments</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map', { location })}>
        <Text>Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 200,
  },
});

export default DefaultScreenPosts;
