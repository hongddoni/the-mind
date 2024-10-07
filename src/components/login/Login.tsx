import React from "react";
import { useSocketContext } from "../container/socket/SocketProvider";
import s from "./login.module.scss";

interface Props {
	onClose: () => void;
}

export const Login = (props: Props) => {
	const { onClose } = props;
	const { nickname, setNickname, joinGame } = useSocketContext()!;

	const startGame = () => {
		if (nickname.length < 1) return;

		joinGame();
		onClose();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		if (value.length > 6) return;
		setNickname(value);
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			startGame();
		}
	};

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
						onKeyDown={onKeyDown}
						maxLength={6}
					/>
				</div>
				<button className={s.button} onClick={startGame}>
					참가!
				</button>
			</div>
		</div>
	);
};
