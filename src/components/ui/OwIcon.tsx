import React from 'react';
import { League } from 'types';

interface Props {
	kind: League;
	width: number;
}

const OwIcon = ({kind, width}: Props) => (
	<img src={`img/${kind}.png`} width={width} alt={kind} />
);

export default OwIcon;