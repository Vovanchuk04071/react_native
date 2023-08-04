import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync();

    setPhoto(photo);
    setLocation(location);
  };

  const sendPhoto = async () => {
    navigation.navigate('DefaultPostsScreen', { photo, location });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo?.uri }} style={{ width: 200, height: 200 }} />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}>Take Picture</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity style={styles.sendContainer} onPress={sendPhoto}>
          <Text style={styles.snap}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: '70%',
    marginTop: 50,
    marginHorizontal: 2,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  snapContainer: {
    marginTop: 200,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snap: {
    color: '#fff',
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  sendContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});

export default CreateScreen;
