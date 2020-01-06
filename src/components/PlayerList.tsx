import React, { useEffect, useState, useCallback } from 'react';
import TextInput from './ui/TextInput';
import Flex from './ui/Flex';
import Table from './Table';
import {Player} from '../types';
import Tabs from './ui/Tabs';
import { playersCollection } from 'firebaseRef';
import { useAccess } from 'hooks';

const tabs = [
	{
		title: 'Player database',
		value: 'db',
	},
	{
		title: 'Match pool',
		value: 'match',
	},
];

const PlayerList = ({playersList}: {playersList: Player[]}) => {
	const [players, setPlayers] = useState<Player[]>(playersList);
	const [inputData, setInputData] = useState('');
	const [activeTab, setActiveTab] = useState('db');
	const access = useAccess();

	useEffect(() => {
		if (players.length) return;

		(async () => {
			try {
				const querySnapshot = await playersCollection.get();
				const queryPlayers: Player[] = [];

				querySnapshot.forEach(doc => queryPlayers.push(doc.data() as Player));
				setPlayers(queryPlayers);
			} catch(error) {
				console.error(error);
			}
		})();
	}, [players]);

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			const docRef = await playersCollection.add({
				battletag: inputData,
				created: new Date(),
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	}

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputData(event.target.value.trim());
	}
	
	const handleTabClick = useCallback((value: string) => {
		setActiveTab(value);
	}, []);

	return (
		<Flex direction="column">
			<Tabs tabs={tabs} activeTab={activeTab} onClick={handleTabClick} />
			{access?.players?.write &&
				<form>
					<Flex justifyContent="space-between">
						<TextInput width={100} onChange={handleInput} placeholder="" />
						<TextInput width={100} onChange={handleInput} placeholder="" />
						<TextInput width={100} onChange={handleInput} placeholder="" />
					</Flex>
					<button type="submit" onClick={handleSubmit}>Добавить</button>
				</form>
			}
			<Table players={players} width={430} height="75vh" hasPointsColumn />
		</Flex>
	);
};

export default PlayerList;