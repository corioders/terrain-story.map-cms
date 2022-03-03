import { initializeApp } from 'firebase/app';
import { initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { browserLocalPersistence, indexedDBLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, collection, query } from 'firebase/firestore';
import { doc, getDocs, getDoc, setDoc, addDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { DocumentData, DocumentReference } from 'firebase/firestore';

import '@/firebase/init';

export interface Location {
	name: string;
}
export interface Locations {
	[locationID: string]: Location;
}
export interface Floor {
	index?: number;
	name: string;
	puzzleIDs: string[];
}

// Below code must be keep in sync with https://github.com/corioders/terrain-story.frontend/blob/master/src/components/map/floor/floorMap.ts
async function getGameReference(locationID: string, gameName: string): Promise<DocumentReference<DocumentData>> {
	const db = getFirestore();
	const mapCms = collection(db, 'map-cms');

	const locationSnapshot = await getDoc(doc(mapCms, locationID));
	if (!locationSnapshot.exists()) {
		alert('Nieznany błąd :<');
		throw 'LocationSnapshot does not exist.';
	}

	return doc(collection(locationSnapshot.ref, 'games'), gameName);
}

export async function getFloors(locationID: string, gameName: string): Promise<Floor[]> {
	const gameReference = await getGameReference(locationID, gameName);
	const gameSnapshot = await getDoc(gameReference);
	if (!gameSnapshot.exists()) {
		return [];
	}

	const floorsSnapshot = await getDocs(query(collection(gameSnapshot.ref, 'floors'), orderBy('index')));
	const floors: Floor[] = await Promise.all(
		floorsSnapshot.docs.map(async (floorDoc) => {
			return floorDoc.data() as Floor;
		}),
	);

	return floors;
}
// Keep in sync section end

export async function setFloors(locationID: string, gameName: string, floors: Floor[]): Promise<void> {
	const gameReference = await getGameReference(locationID, gameName);
	const gameSnapshot = await getDoc(gameReference);
	if (!gameSnapshot.exists()) {
		await setDoc(gameReference, {});
	}

	const floorsCollection = collection(gameSnapshot.ref, 'floors');

	// Delete all floor entries.
	const floorsSnapshot = await getDocs(floorsCollection);
	await Promise.all(floorsSnapshot.docs.map((floorDoc) => deleteDoc(floorDoc.ref)));

	// Add our new one's.
	const floorPromises = [];
	for (let i = 0; i < floors.length; i++) {
		floors[i].index = i;
		floorPromises.push(addDoc(floorsCollection, floors[i]));
	}
	await Promise.all(floorPromises);
}

export async function getLocations(): Promise<Locations> {
	const db = getFirestore();
	const mapCms = collection(db, 'map-cms');
	const locationsSnapshot = await getDocs(mapCms);

	const locations: Locations = {};
	for (const locationDoc of locationsSnapshot.docs) {
		locations[locationDoc.id] = locationDoc.data() as Location;
	}

	return locations;
}

export async function setLocations(locations: Locations): Promise<void> {
	const originalLocations = await getLocations();

	const additionalLocations = [];
	for (const locationID in locations) if (originalLocations[locationID] === undefined) additionalLocations.push(locationID);

	const db = getFirestore();
	const mapCms = collection(db, 'map-cms');

	await Promise.all(
		additionalLocations.map(async (locationID) => {
			const locationDoc = doc(mapCms, locationID);
			await setDoc(locationDoc, locations[locationID]);
		}),
	);
}
