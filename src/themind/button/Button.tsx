import React from "react";
import s from "./button.module.scss";
import classNames from "classnames";

interface Props {
	children: React.ReactNode;
	onClick: () => void;
	color?: 'default' | 'red' | 'yellow' | 'black'
	block?: boolean;
}

export const Button = (props: Props) => {
	const {color= 'default', block, children} = props;
	return (
		<button className={classNames(s.button, s[color], block && s.block)} onClick={props.onClick}>
			{children}
		</button>
	);
};
