import { useBoardCardList } from "../hooks/useBoardCardList.ts";
import { Card } from "../../card/Card.tsx";
import s from "./boardCardList.module.scss";
import { BoardCardWrap } from "./BoardCardWrap.tsx";
import { useSocketContext } from "../../container/socket/SocketProvider.tsx";

export const BoardCardList = () => {
	const { cards, ref, maxWidth } = useBoardCardList();
	const { isGameAvailable } = useSocketContext()!;

	const renderer = () => {
		if (!isGameAvailable) {
			return <span>game over</span>;
		}

		return (
			<>
				{cards?.map((card, index) => (
					<BoardCardWrap
						key={card}
						zIndex={index}
						x={(maxWidth / 35) * index}
						y={0}
					>
						<Card number={card} hightLight={false} />
					</BoardCardWrap>
				))}
			</>
		);
	};

	return (
		<div className={s.cardList} ref={ref}>
			{renderer()}
		</div>
	);
};
