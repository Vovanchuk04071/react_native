// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDANPF84V2KITHlNUSZyo4xqyIZDiTgwfM',
  authDomain: 'rn-social-da351.firebaseapp.com',
  projectId: 'rn-social-da351',
  storageBucket: 'rn-social-da351.appspot.com',
  messagingSenderId: '790158504240',
  appId: '1:790158504240:web:ea69dbac5369aa1b6218f5',
  measurementId: 'G-CM4SS1GZ9D',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
