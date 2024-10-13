import s from "./login.module.scss";
import {useSocketContext} from "../../socket/SocketProvider.tsx";
import {GameType} from "../../type/gameType.ts";

interface Props {
	onClose: () => void;
}

export const Login = (props: Props) => {
	const { onClose } = props;
	const { nickname, setNickname, joinGame, setGameType, gameType } = useSocketContext()!;

	const startGame = (type: GameType) => {
		if (nickname.length < 1) return;

		joinGame(type);
		onClose();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		if (value.length > 6) return;
		setNickname(value);
	};

	const onGameClick = (type: GameType) => {
		if(nickname.length < 1) return;
		setGameType(type);
		startGame(type);
	}

	return (
		<div className={s.login}>
			<div className={s.modal}>
				<div className={s.title}>
					<p>The Mind</p>
				</div>
				<div className={s.nickname}>
					<input
						type="text"
						placeholder="닉네임"
						value={nickname}
						onChange={onChange}
						maxLength={6}
					/>
				</div>

				{gameType === null && <div>
					<button className={s.button} onClick={() => onGameClick('theMind')}>theMind</button>
					<button className={s.button} onClick={() => onGameClick('chaoChao')}>chaochao</button>
				</div>}
			</div>
		</div>
	);
};
