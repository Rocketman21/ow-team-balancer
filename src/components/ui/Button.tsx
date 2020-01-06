import React, { ReactNode } from 'react';
import '../../styles/Button.css';
import cn from 'classnames';

interface Props {
	children: ReactNode;
	isPrimary?: boolean;
	onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Button = ({children, isPrimary, onClick}: Props) => (
	<button
		className={cn({
			'ui-button': true,
			'ui-button_primary': isPrimary,
		})}
		onClick={onClick}
	>
			{children}
	</button>
);

export default Button;