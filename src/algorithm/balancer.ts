import _ from 'lodash';
import { Player, Match } from 'types';
import { getPlayersAverageScore } from 'helpers';

export const makeTeams = (players: Player[]) => {
	const {offense, tank, support} = _.groupBy(players, 'role');

	if (!offense || !tank || !support) return [];

	return Array
		.from({length: Math.min(offense.length, tank.length, support.length) / 2})
		.map((_, index) => {
			const firstInPair = index * 2;
			const lastInPair = index * 2 + 1;

			return [
				offense[firstInPair],
				offense[lastInPair],
				tank[firstInPair],
				tank[lastInPair],
				support[firstInPair],
				support[lastInPair],
			];
	});
}

const getSortedPlayers = (players: Player[]) => _.sortBy(players, 'points');

export const getMatchList = (players: Player[]) => {
	const teams = makeTeams(getSortedPlayers(players));

	return Array
		.from({length: teams.length / 2})
		.map((_, index) => [teams[index * 2], teams[index * 2 + 1]]);
};

const getPlayerClosestToScore = (players: Player[], score: number) => {
	const playersDifference = players.map(player => ({player, difference: Math.abs(score - player.points)}));
	const minDifference = Math.min(..._.map(playersDifference, 'difference'));
	
	return playersDifference.find(wrapedPlayer => wrapedPlayer.difference === minDifference)!.player;
};

export const getBalancedMatches = (players: Player[]) => {
	const matches = getMatchList(players);

	const balancedMatches = matches.map((match, matchID) => {
		const averageScore = getPlayersAverageScore([...match[0], ...match[1]]);
		const [groupedA, groupedB] = match.map(team => _.groupBy(team, 'role'));
		const unitedGroups = _.mapValues(groupedA, (group, role) => [...group, ...groupedB[role]]);

		const balancedMatch: Match = [[], []];

		_.forEach(unitedGroups, group => {
			group.forEach((player, index) => {
				const playerClosestToAverage = getPlayerClosestToScore(group, averageScore);

				balancedMatch[index % 2].push(playerClosestToAverage);
				group = group.filter(player => player !== playerClosestToAverage);
			});
		});

		return balancedMatch;
	});

	return balancedMatches;
}