import React, { useMemo, useCallback, Fragment } from 'react';
import '../styles/Table.css';
import OwIcon from './ui/OwIcon';
import cn from 'classnames';
import { Player, League } from 'types';
import { getPlayersAverageScore } from 'helpers';

interface Props {
	players: Player[];
	isSmall?: boolean;
	height?: number | string;
	width?: number | string;
	hasPointsColumn?: boolean;
	isRevesed?: boolean;
}

const zeroPadding = {padding: 0};
const getLeagueIconKind = (points: number): League => {
	if (points < 1500) {
		return 'bronze';
	} else if (points >= 4000) {
		return 'gm';
	}

	return (['silver', 'gold', 'platinum', 'diamond', 'master'] as League[])[Math.floor(points / 500) - 3];
}

const Table = ({players, height, width, hasPointsColumn, isRevesed, isSmall}: Props) => {
	const className = cn(
		'ui-table',
		{
			'ui-table--kind_small': isSmall,
			'ui-table--kind_large': !isSmall,
			'ui-table--display_reversed': isRevesed,
		}
	);

	const style = useMemo(() => ({height, width, overflowY: 'auto' as 'auto'}), [height, width]);

	const headerColumns = useMemo(() => {
		const points = getPlayersAverageScore(players);
		const cols = [
			<th key="hcol1"></th>,
			<Fragment key="hcol2">
				<th style={{width: '8em'}}>
					{isSmall ? points : 'battletag'}
				</th>
				{hasPointsColumn && <th>Points</th>}
			</Fragment>,
			<th key="hcol3" style={zeroPadding}>{isSmall && <OwIcon kind={getLeagueIconKind(points)} width={30} />}</th>
		];

		return isRevesed ? cols.reverse() : cols;
	}, [hasPointsColumn, isRevesed, isSmall, players]);

	const getBodyColumns = useCallback((player: Player) => {
		const cols = [
			<td key="bcol1" style={zeroPadding}><OwIcon kind={player.role} width={20} /></td>,
			<Fragment key="bcol2">
				<td>{player.battletag}</td>
				{hasPointsColumn && <td>{player.points}</td>}
			</Fragment>,
			<td key="bcol3" style={isSmall ? zeroPadding : {padding: '3px 5px 0 5px'}}><OwIcon kind={getLeagueIconKind(player.points)} width={30} /></td>
		];

		return isRevesed ? cols.reverse() : cols;
	}, [hasPointsColumn, isRevesed, isSmall]);

	return (
		<div className={className} style={style}>
			<table>
				<thead>
					<tr>{headerColumns}</tr>
				</thead>
				<tbody className="table-body">
					{players.map(player => (
						<tr key={player.id}>{getBodyColumns(player)}</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default React.memo(Table);