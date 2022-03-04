import { addDoc, deleteDoc, collection, CollectionReference, doc, DocumentData, getFirestore, getDocs } from 'firebase/firestore';

import '@/firebase/init';

export type Subject = 'english' | 'math' | 'polish';

export interface Question {
	// This subject names must be keep in sync with names of firestore document names.
	subject: Subject;

	firebaseId?: string;
	descriptor: {
		question: string;
		options: string[];
		answerIndex: number;

		isHtml: boolean;
	};
}

function getQuestionsCollectionRef(subject: Subject): CollectionReference<DocumentData> {
	const db = getFirestore();
	const preexamRecap = collection(db, 'preexam-recap');
	const questionsCollectionRef = collection(doc(preexamRecap, subject), 'questions');
	return questionsCollectionRef;
}

export async function submitQuestion(question: Question): Promise<void> {
	const questionsCollectionRef = getQuestionsCollectionRef(question.subject);
	await addDoc(questionsCollectionRef, question.descriptor);
}

export async function removeQuestion(question: Question): Promise<void> {
	if (question.firebaseId === undefined) throw new Error('You can only delete ');
	const questionsCollectionRef = getQuestionsCollectionRef(question.subject);
	await deleteDoc(doc(questionsCollectionRef, question.firebaseId));
}

export async function fetchQuestions(subject: Subject): Promise<Question[]> {
	const questionsCollectionRef = getQuestionsCollectionRef(subject);
	const querySnapshot = await getDocs(questionsCollectionRef);
	const questionDescriptors: Question[] = [];

	for (const doc of querySnapshot.docs) {
		const descriptor = doc.data() as Question['descriptor'];
		questionDescriptors.push({
			subject: subject,
			firebaseId: doc.id,
			descriptor,
		});
	}

	return questionDescriptors;
}
