import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReduser';

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async dispach => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: nickname,
      });

      const { uid, displayName } = await auth.currentUser;

      dispach(authSlice.actions.updateUserProfile({ userId: uid, nickname: displayName }));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authStateChangeUser = () => async dispach => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      dispach(
        authSlice.actions.updateUserProfile({ userId: user.uid, nickname: user.displayName }),
      );

      dispach(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export const authSignOutUser = () => async dispach => {
  await signOut(auth);

  dispach(authSlice.actions.authSignOut());
};
