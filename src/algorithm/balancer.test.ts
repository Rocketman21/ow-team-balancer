import {getMatchList, makeTeams, getBalancedMatches} from './balancer';
import _ from 'lodash';
import playersMock from './playersMock';
import { getPlayersAverageScore } from 'helpers';

// const randomPlayers = Array
// 	.from({length: 20})
// 	.map((_, index) => ({
// 		id: index.toString(),
// 		role: ['offense', 'tank', 'support'][getRandomInt(3)],
// 		points: getRandomInt(5000),
// 	}));
	
describe('balancer.ts', () => {
	describe('makeTeams', () => {
		const teams = makeTeams(playersMock);

		it('should return a list of teams', () => {
			expect(teams).toBeInstanceOf(Array);
		});
		it('each team should be an array', () => {
			expect(teams.every(team => team instanceof Array)).toBe(true);
		});
		it('each player in team should be valid', () => {
			teams.forEach(team => {
				team.forEach(player => {
					expect(player).toHaveProperty('id');
					expect(player).toHaveProperty('role');
					expect(player).toHaveProperty('points');
				});
			});
		});
		it('teams amount should be the same as the smallest role group divided by two', () => {
			const {offense, tank, support} = _.groupBy(playersMock, 'role');
			const minGroupLength = Math.min(offense.length, tank.length, support.length);
		
			expect(teams.length).toBe(Math.floor(minGroupLength / 2));
		});
		it('each player should be unique', () => {
			const playersFromTeams = _.flatten(teams);
			const uniquePlayers = _.uniqBy(playersFromTeams, 'id');

			expect(playersFromTeams.length).toBe(uniquePlayers.length);
			expect(playersFromTeams).toEqual(uniquePlayers);
		})
		it('every team should have 6 players', () => {
			expect(teams.every(team => team.length === 6)).toBe(true);
		});
		it('every team should have 2 players of each role', () => {
			expect(
				teams.every(
					team => team.filter(player => player.role === 'offense').length === 2
						&& team.filter(player => player.role === 'tank').length === 2
						&& team.filter(player => player.role === 'support').length === 2
				)
			).toBe(true);
		});
	});

	const useBasicMatchTests = (matches) => {
		it('should return a list of matches', () => {
			expect(matches).toBeInstanceOf(Array);
		});
		it('each match should be an array', () => {
			expect(matches.every(team => team instanceof Array)).toBe(true);
		});
		it('should return an empty array if not enough players for one match', () => {
			expect(getMatchList([])).toEqual([]);
			expect(getMatchList([{role: 'offense', points: 2000}])).toEqual([]);
		});
		it('should retrun 38 matches for playersMock', () => {
			expect(matches.length).toBe(38);
		});
		it('every match should have 2 teams', () => {
			expect(matches.every(match => match.length === 2)).toBe(true);
		});
	};

	describe('getMatchList', () => {
		useBasicMatchTests(getMatchList(playersMock));
	});

	describe('getBalancedMatches', () => {
		const matches = getBalancedMatches(playersMock);

		useBasicMatchTests(matches);

		it('should contain the same players in each match which getMatchList returns', () => {
			const notBalancedMatches = getMatchList(playersMock);

			expect(notBalancedMatches.every((match, mIndex) => (
				match.every((team, tIndex) => team.some(
					player => matches[mIndex][tIndex].includes(player)
				))
			))).toBe(true);
		});
		it('difference between team scores in each match should be less then 100', () => {
			matches.forEach(match => {
				const [teamAScore, teamBScore] = match.map(getPlayersAverageScore);

				expect(Math.abs(teamAScore - teamBScore)).toBeLessThan(100);
			});
		});
	});
}); 
