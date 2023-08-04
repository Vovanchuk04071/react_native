import { View, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        style={styles.map}
      >
        <Marker coordinate={location?.coords} title="You are here" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
