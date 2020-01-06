import React from 'react';
import firebase from 'firebase/app';
import { usersCollection, googleAuthProvider } from 'firebaseRef';
import { useAuth } from 'hooks';
import Button from './ui/Button';

const Login = () => {
	const {isLoggedIn} = useAuth();

	const handleLoginClick = async () => {
		if (isLoggedIn) {
			firebase.auth().signOut();
		} else {
			try {
				const result = await firebase.auth().signInWithPopup(googleAuthProvider);
				const {user} = result;

				if (user && result.additionalUserInfo?.isNewUser) {
					await usersCollection.add({
						id: user.uid,
						name: user?.displayName,
						email: user?.email,
					});
				}
			} catch(error) {
				console.error(error);
			};
		}
	}

	return (
		<Button isPrimary={!isLoggedIn} onClick={handleLoginClick}>{isLoggedIn ? 'Logout' : 'Login'}</Button>
	);
};

export default Login;