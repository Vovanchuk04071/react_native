import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {authSignUpUser} from '../../redux/auth/authOperations';
import {useDispatch} from 'react-redux';

const initialState = {
    email: '',
    password: '',
    nickname: '',
};

export default function RegisterScreen({navigation}) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);

    const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 20 * 2);

    const dispatch = useDispatch();

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get('window').width - 20 * 2;
            setDimensions(width);
        };
        Dimensions.addEventListener('change', onChange);

        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    }, []);

    const handleSubmit = async () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        console.log(state);

        dispatch(authSignUpUser(state))
        setState(initialState);
    };

    const keyboardHide = () => setIsShowKeyboard(false);

    const updateState = (key, value) => setState(prevState => ({...prevState, [key]: value}));

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.image}
                    source={require('../../assets/images/stars-on-night.jpg')}
                >
                    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <View
                            style={{
                                ...styles.form,
                                marginBottom: isShowKeyboard ? 20 : 150,
                                width: dimensions,
                            }}
                        >
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Hello</Text>
                                <Text style={styles.headerTitle}>Sign up to get started</Text>
                            </View>
                            <View>
                                <Text style={styles.inputTitle}>NICKNAME</Text>
                                <TextInput
                                    style={styles.input}
                                    textAlign={'center'}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.nickname}
                                    onChangeText={value => updateState('nickname', value)}
                                />
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
                                <TextInput
                                    style={styles.input}
                                    textAlign={'center'}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.email}
                                    onChangeText={value => updateState('email', value)}
                                />
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.inputTitle}>PASSWORD</Text>
                                <TextInput
                                    style={styles.input}
                                    textAlign={'center'}
                                    secureTextEntry={true}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.password}
                                    onChangeText={value => updateState('password', value)}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={handleSubmit}>
                                <Text style={styles.btnTitle}>SIGN UP</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                <Text style={{color: '#fff'}}>
                                    New to application?
                                    <Text style={{fontSize: 20, color: '#ff6347'}}>Sign In</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
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
        borderWidth: 1,
        borderColor: '#f0f8ff',
        height: 40,
        borderRadius: 6,

        color: '#f0f8ff',
    },
    form: {
        // marginHorizontal: 40,
    },
    inputTitle: {
        color: '#f0f8ff',
        marginBottom: 10,
        fontSize: 18,
        fontFamily: 'DMMono-Regular',
    },
    btn: {
        borderRadius: 6,
        borderWidth: 1,
        height: 40,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: Platform.OS === 'ios' ? '#4169e1' : '#f0f8ff',
        fontSize: 18,
        fontFamily: 'DMMono-Regular',
    },
    header: {
        alignItems: 'center',
        marginBottom: 90,
    },
    headerTitle: {
        fontSize: 40,
        color: '#f0f8ff',
        fontFamily: 'DMMono-Regular',
    },
});
