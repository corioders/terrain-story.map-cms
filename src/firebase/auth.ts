import { initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { browserLocalPersistence, indexedDBLocalPersistence, browserSessionPersistence } from 'firebase/auth';

import { app } from './init';

const auth = initializeAuth(app, {
	persistence: [browserLocalPersistence, indexedDBLocalPersistence, browserSessionPersistence],
});

export async function authenticate(email: string, password: string): Promise<void> {
	await signInWithEmailAndPassword(auth, email, password);
}

let isAuth = false;

let isAuthPromiseResolve: () => void;
const isAuthPromise = new Promise<void>((resolve) => (isAuthPromiseResolve = resolve));

auth.onAuthStateChanged((user) => {
	if (user === null) {
		isAuth = false;
		isAuthPromiseResolve();
	} else {
		isAuth = true;
		isAuthPromiseResolve();
	}
});

export async function isAuthenticated(): Promise<boolean> {
	await isAuthPromise;
	return isAuth;
}
