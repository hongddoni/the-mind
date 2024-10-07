import { useSocketContext } from "../container/socket/SocketProvider";
import s from "./dashboard.module.scss";

export const Dashboard = () => {
	const {
		users,
		level,
		heartCard,
		surikenCard,
		isGameAvailable,
		onSurikenCard,
		onHeartCard,
		onReady,
		onRestart,
	} = useSocketContext()!;

	const renderer = () => {
		if (isGameAvailable) {
			return (
				<div className={s.info}>
					<span>참여자 수 : {users.length}, </span>
					<span>레벨 : {level}, </span>
					<span>생명 카드 : {heartCard}, </span>
					<span>수리검 카드 : {surikenCard}</span>
				</div>
			);
		}

		return (
			<button onClick={onReady} className={s.button}>
				게임 준비
			</button>
		);
	};

	return (
		<div className={s.dashboard}>
			<button onClick={onRestart}>restart</button>
			<div>{renderer()}</div>
			<button onClick={onSurikenCard}>suriken</button>
			<button onClick={onHeartCard}>heart</button>
			<div>현재 참여자 : {users?.map((v) => `${v.nickname} `)}</div>
		</div>
	);
};
