import React from 'react';
import cn from 'classnames';
import '../../styles/Flex.css';

export interface FlexProps {
	direction?: 'row' | 'column' | 'row-reverse';
	indent?: 'small' | 'medium' | 'large';
	justifyContent?: 'flex-end' | 'center' | 'space-between' | 'space-around';
	wrap?: 'wrap';
	children?: React.ReactNode;
	width?: string | number;
	height?: string | number;
	className?: string;
}

const Flex = ({children, direction='row', indent, width, height, justifyContent, className, wrap}: FlexProps) => {
	const classes = cn(
		'ui-flex',
		'ui-flex--direction_row',
		className,
		{
			'ui-flex--indent_small': indent === 'small',
			'ui-flex--indent_medium': indent === 'medium',
			'ui-flex--indent_large': indent === 'large',
			'ui-flex--wrap_wrap': wrap === 'wrap',
		}
	);
	
	return (
		<div
			className={classes}
			style={{width, height, flexDirection: direction, justifyContent}}
		>
			{children}
		</div>
	);
};

export default Flex;