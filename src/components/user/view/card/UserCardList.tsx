import React from "react";
import s from "./userCardList.module.scss";
import { Card } from "../../../card/Card.tsx";
import { useUserCards } from "../hooks/useUserCards.ts";

interface Props {}

export const UserCardList: React.FC<React.PropsWithChildren<Props>> = (
	props
) => {
	const { cards, onClick, minimumNumber } = useUserCards();
	return (
		<div>
			<div>
				<span>제일 작은 숫자 : {minimumNumber}</span>
				<button onClick={() => onClick(minimumNumber)}>내기</button>
			</div>
			<div className={s.cardList}>
				{cards?.map((card) => (
					<Card
						number={card}
						key={card}
						onClick={onClick}
						hightLight={minimumNumber === card}
					/>
				))}
			</div>
		</div>
	);
};
