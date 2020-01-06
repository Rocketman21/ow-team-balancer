import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { accessCollection } from 'firebaseRef';
import { Access } from 'types';

export function useAuth() {
	const auth = firebase.auth();
	const [userID, setUserID] = useState(auth.currentUser?.uid);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUserID(user?.uid);
		});
	}, [auth]);

	return {isLoggedIn: !!userID, userID};
}

export function useAccess() {
	const {isLoggedIn, userID} = useAuth();
	const [access, setAccess] = useState<Access | undefined>();

	useEffect(() => {
		(async () => {
			if (!isLoggedIn) {
				setAccess(undefined);
			
				return;
			}

			try {
				const accessDoc = await accessCollection.doc(userID).get();
				const docData = accessDoc.data();
	
				if (docData) {
					setAccess(docData as Access);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [isLoggedIn, userID]);

	return access;
}