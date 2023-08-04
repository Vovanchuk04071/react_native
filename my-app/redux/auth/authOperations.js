import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';

export const authSignUpUser = ({email, password, nickname}) => async () => {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
  
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};
//
// export const authSignOutUser = () => async (dispatch, getState) => {
// };
