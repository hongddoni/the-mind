import React from "react";
import s from "./userCardList.module.scss";
import { Card } from "../../../card/Card.tsx";
import { useUserCards } from "../hooks/useUserCards.ts";

interface Props {}

export const UserCardList: React.FC<React.PropsWithChildren<Props>> = (
	props
) => {
	const { cards, onClick } = useUserCards();

	return (
		<div className={s.cardList}>
			{cards?.map((card) => (
				<Card number={card} key={card} onClick={onClick} />
			))}
		</div>
	);
};
