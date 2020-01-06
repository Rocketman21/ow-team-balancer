import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyAZqUUv1gkGq0ZaxZlpT4dB634pZqnhMgg',
	authDomain: 'ow-balancer-api.firebaseapp.com',
	projectId: 'ow-balancer-api'
});

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const usersCollection = firebase.firestore().collection('users');
export const playersCollection = firebase.firestore().collection('players');
export const accessCollection = firebase.firestore().collection('access');