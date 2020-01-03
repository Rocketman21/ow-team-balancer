import React from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import './styles/ui-helpers.css';
import PlayersTable from './components/PlayersTable';
import Flex from 'components/ui/Flex';
import MatchCard from 'components/MatchCard';
import { getBalancedMatches } from 'algorithm/balancer';
import { getRandomInt } from 'helpers';
import { Player } from 'types';

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
    <Flex className="App">
      <PlayersTable playersList={randomPlayers} />
      <Flex className="abc" height="75vh" wrap="wrap">
        {matches.map((match, index) => <MatchCard match={match} number={index + 1} />)}
      </Flex>
    </Flex>
  );
}

export default App;
