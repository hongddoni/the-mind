import s from "./userCardList.module.scss";
import { Card } from "../../../card/Card.tsx";
import { useUserCards } from "../hooks/useUserCards.ts";

export const UserCardList = () => {
	const { cards, onClick, minimumNumber } = useUserCards();
	return (
		<div className={s.wrap}>
			<div className={s.minimal}>
				{minimumNumber !== 0 && (
					<Card
						number={minimumNumber}
						hightLight={false}
						onClick={() => onClick(minimumNumber)}
					/>
				)}
			</div>
			<div className={s.cardList}>
				{cards?.map((card) => (
					<Card number={card} key={card} onClick={onClick} />
				))}
			</div>
		</div>
	);
};
