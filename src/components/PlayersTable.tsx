import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import TextInput from './ui/TextInput';
import Flex from './ui/Flex';
import Table from './ui/Table';
import {Player} from '../types';

firebase.initializeApp({
	apiKey: 'AIzaSyAZqUUv1gkGq0ZaxZlpT4dB634pZqnhMgg',
	authDomain: 'ow-balancer-api.firebaseapp.com',
	projectId: 'ow-balancer-api'
});

const dbPlayers = firebase.firestore().collection("players");

const PlayersTable = ({playersList}: {playersList: Player[]}) => {
	const [players, setPlayers] = useState<Player[]>(playersList);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    if (players.length) return;

    (async () => {
      try {
        const querySnapshot = await dbPlayers.get();
        const queryPlayers: Player[] = [];

        querySnapshot.forEach(doc => queryPlayers.push(doc.data() as Player));
        setPlayers(queryPlayers);
      } catch(error) {}
    })();
  }, [players]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const docRef = await dbPlayers.add({
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

	return (
		<div>
			{/* <form>
				<Flex justifyContent="space-between">
					<TextInput width={100} onChange={handleInput} placeholder="" />
					<TextInput width={100} onChange={handleInput} placeholder="" />
					<TextInput width={100} onChange={handleInput} placeholder="" />
				</Flex>
				<button type="submit" onClick={handleSubmit}>Добавить</button>
			</form> */}
			<Table players={players} width={460} height="75vh" hasPointsColumn />
		</div>
	);
};

export default PlayersTable;