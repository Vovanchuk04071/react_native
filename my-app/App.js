import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
};

const loadApplication = async () =>
  await Font.loadAsync({
    'YsabeauSC-Regular': require('./assets/fonts/YsabeauSC-Regular.ttf'),
  });

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 20 * 2);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    setState(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 20 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/images/stars-on-night.jpg')}
          style={styles.image}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View
              style={{ ...styles.form, marginBottom: isShowKeyboard ? 20 : 100, width: dimensions }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello again</Text>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  textAlign={'center'}
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={text => setState({ ...state, email: text })}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={'center'}
                  secureTextEntry
                  value={state.password}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={text => setState({ ...state, password: text })}
                />
              </View>
              <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={hideKeyboard}>
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    color: '#f0f8ff',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#f0f8ff',
    height: 40,
    textAlign: 'center',
  },
  form: {
    // marginHorizontal: 40,

    marginBottom: 100,
  },
  inputTitle: {
    color: '#f0f8ff',
    fontFamily: 'YsabeauSC-Regular',
  },
  btn: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        borderColor: '#f0f8ff',
      },
      android: {
        backgroundColor: '#4169e1',
        borderColor: 'transparent',
      },
    }),
  },
  btnTitle: {
    fontSize: 18,
    fontFamily: 'YsabeauSC-Regular',
    ...Platform.select({
      ios: {
        color: '#4169e1',
      },
      android: {
        color: '#f0f8ff',
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: 150,
  },
  headerTitle: {
    fontSize: 30,
    color: '#f0f8ff',
    fontFamily: 'YsabeauSC-Regular',
  },
});
