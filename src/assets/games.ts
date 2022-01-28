export interface GameDescriptor {
	name: string;
	puzzleIDs: string[];
}

// Name must be the same as name used in the game url.
export const gameDescriptors: GameDescriptor[] = [
	{
		name: 'santa-in-trouble',
		puzzleIDs: ['Quiz', 'FestivalsMatching', 'Gaps', 'QuestionTag', 'Carols', 'Rebus'],
	},
	{
		name: 'poszukiwacze-camienia',
		puzzleIDs: ['Archaeologist', 'Dancer', 'Hacker', 'Inspector', 'Mage', 'Princess', 'Tourist', 'Treasurer'],
	},
];
Object.freeze(gameDescriptors);
