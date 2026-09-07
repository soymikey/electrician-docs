import {initializeApp, getApps} from 'firebase/app';
import {getAnalytics, isSupported} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCon7a3xM_awv1tuEMefGywOnUqfnpbQBI',
  authDomain: 'electrician-docs.firebaseapp.com',
  projectId: 'electrician-docs',
  storageBucket: 'electrician-docs.firebasestorage.app',
  messagingSenderId: '521499068676',
  appId: '1:521499068676:web:6412adfd97fe2c66e8a851',
  measurementId: 'G-YVMJQEETJJ',
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);

isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  })
  .catch(() => {
    // Analytics is optional; the docs should still load if the browser blocks it.
  });
