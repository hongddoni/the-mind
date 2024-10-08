import { useBoardCardList } from "../hooks/useBoardCardList.ts";
import { Card } from "../../card/Card.tsx";
import s from "./boardCardList.module.scss";
import { BoardCardWrap } from "./BoardCardWrap.tsx";
import { useSocketContext } from "../../container/socket/SocketProvider.tsx";
import {Button} from "../../button/Button.tsx";
import {Label} from "../../label/Label.tsx";

export const BoardCardList = () => {
	const { cards, ref, maxWidth } = useBoardCardList();
	const { isGameAvailable, onReady, users } = useSocketContext()!;


	const renderer = () => {
		if (!isGameAvailable) {
			return (
				<div className={s.ready}>
					<div className={s.info}>
						<span className={s.description}>현재 참여자</span>
						<div className={s.participants}>
							{users?.map((v) => <Label>{v.nickname}</Label>)}
						</div>
					</div>
					<Button onClick={onReady} block>게임 준비</Button>
				</div>
			);
		}

		return (
			<div className={s.cardWrap}>
				{cards?.map((card, index) => {
					return (
                        <BoardCardWrap
                            key={card}
                            zIndex={index}
                            x={Math.floor(Math.random() * 11) - 5}
                            y={Math.floor(Math.random() * 11) - 5}
                        >
                            <Card number={card} hightLight={false} />
                        </BoardCardWrap>
					)
                })}
			</div>
		);
	};

	return (
		<div className={s.cardList} ref={ref}>
			{renderer()}
		</div>
	);
};
