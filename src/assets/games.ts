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
	{
		name: 'pomoz-abelardowi',
		puzzleIDs: ['Bingo', 'Emotions1', 'Emotions2', 'Jacobson', 'Rebus', 'Matching1', 'Matching2', 'PhoneNumbers'],
	},
	{
		name: 'wygraj-mature',
		puzzleIDs: ['1', '2', '3', '4', '5', '6'],
	},
];
Object.freeze(gameDescriptors);
