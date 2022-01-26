export interface Game {
	name: string;
	puzzleIDs: string[];
}

const games: Game[] = [
	{
		name: 'Santa in Trouble',
		puzzleIDs: ['Quiz', 'FestivalsMatching', 'Gaps', 'QuestionTag', 'Carols', 'Rebus'],
	},
	{
		name: 'Poszukiwacze Camienia',
		puzzleIDs: ['Archaeologist', 'Dancer', 'Hacker', 'Inspector', 'Mage', 'Princess', 'Tourist', 'Treasurer'],
	},
];
Object.freeze(games);
export default games;
