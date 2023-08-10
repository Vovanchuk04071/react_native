import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../router';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChangeUser } from '../redux/auth/authOperations';

export const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{useRoute(stateChange)}</NavigationContainer>;
};
