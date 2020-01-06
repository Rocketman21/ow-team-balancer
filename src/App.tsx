import React from 'react';
import './styles/App.css';
import './styles/ui-helpers.css';
import PlayerList from './components/PlayerList';
import Flex from 'components/ui/Flex';
import MatchCard from 'components/MatchCard';
import { getBalancedMatches } from 'algorithm/balancer';
import { getRandomInt } from 'helpers';
import { Player } from 'types';
import Login from 'components/Login';

const App = () => {
	const randomPlayers = Array
	.from({length: 500})
	.map((_, index) => ({
		id: index.toString(),
		role: ['offense', 'tank', 'support'][getRandomInt(3)] as Player["role"],
		points: getRandomInt(5000),
		battletag: `Tester#${getRandomInt(9999)}`
	}));
	const matches = getBalancedMatches(randomPlayers);

	return (
		<Flex className="App" direction="column">
			<Flex justifyContent="flex-end" indent="large">
				<Login />
			</Flex>
			<Flex indent="large">
				<PlayerList playersList={randomPlayers} />
				<Flex className="match-table" height="85vh" wrap="wrap">
					{matches.map((match, index) => <MatchCard key={index} match={match} number={index + 1} />)}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default App;
