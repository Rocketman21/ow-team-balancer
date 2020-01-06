import React from 'react';
import Table from './Table';
import Flex from './ui/Flex';
import '../styles/match-card.css';
import { Match } from 'types';

interface Props {
	number: number;
	match: Match;
}

const MatchCard = ({number, match}: Props) => (
	<Flex className="match-card" direction="column">
		<span className="match-card--header">MATCH #{number}</span>
		<Flex>
			<Table players={match[0]} isSmall />
			<Table players={match[1]} isSmall isRevesed />
		</Flex>
	</Flex>
);

export default MatchCard;