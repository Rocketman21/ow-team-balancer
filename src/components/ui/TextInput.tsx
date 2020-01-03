import React, { InputHTMLAttributes } from 'react';
import '../../styles/TextInput.css';
import Flex, { FlexProps } from './Flex';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & FlexProps;

const TextInput = (props: TextInputProps) => (
	<Flex width={props.width}>
		<input type="text" className="ui-text-input box" {...props} />
	</Flex>
);

export default TextInput;