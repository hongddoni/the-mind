import { useSocketContext } from "../container/socket/SocketProvider";
import s from "./gameOverModal.module.scss";

export const GameOverModal = () => {
	const { isCleared, isGameAvailable } = useSocketContext()!;

	if (!isCleared) return;

	const renderer = () => {
		if (!isCleared && !isGameAvailable) {
			return (
				<div className={s.background}>
					<span className={s.over}>GAME OVER</span>
				</div>
			);
		}

		if (isCleared) {
			return (
				<div className={s.background}>
					<span className={s.clear}>
						ㅊㅋ합니다 못 깰 거 같아서 그냥 대충 박아놨습니다
					</span>
				</div>
			);
		}
	};

	return <div className={s.gameOver}>{renderer()}</div>;
};
