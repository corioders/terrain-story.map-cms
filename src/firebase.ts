// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

export interface Floor {
	name: string;
	puzzleIDs: string[];
}

// interface FloorDocumentData extends DocumentData {
//   name: string
// }

// async function main(): Promise<void> {
// 	initializeApp({
// 		apiKey: 'AIzaSyDOlR963Jp-FjS_upzGyoyrY8X7RB5f5bI',
// 		projectId: 'core-folio-327613',
// 	});

// 	const db = getFirestore();
// 	const mapCms = collection(db, 'map-cms');

// 	const games = await getDocs(query(mapCms, where('game-name', '==', 'Santa in Trouble')));
// 	if (games.docs.length !== 1) throw 'Error, expected one game';
// 	const game = games.docs[0];


// 	const floorsCollection = collection(mapCms, game.id, 'floors');
// 	const floorsDocs = await getDocs<FloorDocumentData>(floorsCollection);

// 	const floors: Floor[] = await Promise.all(
// 		floorsDocs.docs.map(async (floorDoc) => ({
// 			name: floorDoc.data(),
// 			puzzleIDs: [],
// 		})),
// 	);

// 	console.log(floors);
// }

// main();
