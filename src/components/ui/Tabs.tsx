import React, { ReactNode, useCallback } from 'react';
import Flex from './Flex';
import cn from 'classnames';
import '../../styles/Tabs.css';

interface Props {
	tabs: Array<{title: ReactNode, value: string}>,
	activeTab: string;
	onClick: (value: string) => void;
}

const Tabs = ({tabs, activeTab, onClick}: Props) => {
	const handleTabClick = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
		onClick(event.currentTarget.value);
	}, [onClick]);

	const getTabClasses = useCallback((value) => cn({
		'ui-tabs-btn': true,
		'ui-tabs-btn_active': activeTab === value,
	}), [activeTab]);

	return (
		<Flex className="ui-tabs">
			{tabs.map(({title, value}) => (
				<button
					key={value}
					className={getTabClasses(value)}
					onClick={handleTabClick}
					value={value}
				>
					{title}
				</button>
			))}
		</Flex>
	);
}

export default Tabs;