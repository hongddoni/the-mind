import { createContext, useContext, useEffect, useState } from "react";
import {useSocketContext} from "../../../socket/SocketProvider.tsx";

interface States {
	endGame: () => void;
	onReady: () => void;
	onSubmit: (cardNumber: number) => void;
	removeCard: (cardNumber: number) => void;
	onRestart: () => void;
	onSurikenCard: () => void;
	onHeartCard: () => void;

	isCleared: boolean;
	cards: number[];
	submittedCard: number[];

	level: number;
	surikenCard: number;
	heartCard: number;
	isGameAvailable: boolean;
}

interface Rule {
	level: number;
	heart: number;
	suriken: number;
}

interface Props {
	children: React.ReactNode;
}

export const TheMindProvider = (props: Props) => {
	const { children } = props;
	const {socket, gameType} = useSocketContext()!;

	const [cards, setCards] = useState<number[]>([]);
	const [submittedCard, setSubmittedCard] = useState<number[]>([]);

	const [surikenCard, setSurikenCard] = useState(0);
	const [heartCard, setHeartCard] = useState(0);
	const [level, setLevel] = useState(0);
	const [isGameAvailable, setIsGameAvailable] = useState(false);

	const [isCleared, setIsCleared] = useState(false);

	// 소켓 연결과 이벤트 핸들러 설정
	useEffect(() => {
		if(!socket) return;
		// 제출된 카드 상태 업데이트

		socket.on(
			"submittedCardsUpdated",
			(data: { submittedCard: number[] }) => {
				console.log(data.submittedCard)
				setSubmittedCard(data.submittedCard); // 실시간으로 상태 업데이트
			}
		);

		// 룰 정보 업데이트
		socket.on("ruleInfo", (data: Rule) => {
			setSurikenCard(data.suriken);
			setHeartCard(data.heart);
			setLevel(data.level);
		});

		// 게임이 시작될 때의 상태 업데이트
		socket.on(
			"gameStarted",
			(data: { gameType: string; rule: Rule; cards: number[] }) => {
				setLevel(data.rule.level);
				setSurikenCard(data.rule.suriken);
				setHeartCard(data.rule.heart);
				setCards(data.cards);
				setSubmittedCard([]); // 새로운 게임 시작 시 submittedCard 초기화
				setIsGameAvailable(true);
			}
		);

		// 레벨업 이벤트 수신 및 상태 업데이트
		socket.on("levelUp", (data: { level: number; cards: number[] }) => {
			setLevel(data.level); // 서버에서 전송된 새로운 레벨로 업데이트
			setCards(data.cards); // 새롭게 부여된 카드 업데이트
			setSubmittedCard([]); // 레벨업 시 제출된 카드 초기화
		});

		socket.on("surikenDecreased", (data: { suriken: number }) => {
			setSurikenCard(data.suriken);
		});

		socket.on("heartDecreased", (data: { heart: number }) => {
			setHeartCard(data.heart);
		});

		socket.on("gameEnded", () => {
			setSubmittedCard([]);
			setIsGameAvailable(false);
			setCards([]);
		});

		socket.on(
			"gameRestarted",
			(data: { gameType: string; rule: Rule; cards: number[] }) => {
				setIsGameAvailable(true);
				setLevel(data.rule.level);
				setSurikenCard(data.rule.suriken);
				setHeartCard(data.rule.heart);
				setSubmittedCard([]); // 게임이 재시작될 때 submittedCard 초기화
			}
		);

		socket.on("userCards", (data: { userCards: number[], playerId: string }) => {
			if(socket.id === data.playerId) setCards(data.userCards);
		});

		socket.on("isCleared", () => {
			setIsCleared(true);
		});
	}, []);

	const onSurikenCard = () => {
		if (socket) {
			socket.emit("useSuriken", gameType);
		}
	};

	const onHeartCard = () => {
		if (socket) {
			socket.emit("useHeart", gameType);
		}
	};

	// 유저 준비 상태 설정
	const onReady = () => {
		if (socket) {
			socket.emit("setPlayerReady", { gameType });
			socket.emit("userInfo", { gameType });
		}
	};

	const onSubmit = (cardNumber: number) => {
		if (socket) {
			socket.emit("playCard", { gameType, card: cardNumber });
		}
	};

	const onRestart = () => {
		if (socket) {
			socket.emit("restartGame", gameType);
		}
	};

	// 게임 종료
	const endGame = () => {
		if (socket) {
			setIsGameAvailable(false);
			socket.emit("endGame", gameType);
		}
	};

	const removeCard = (card: number) => {
		setCards(cards.filter((c) => c !== card));
	};

	const value = {
		endGame,
		onReady,
		onSubmit,
		removeCard,
		onRestart,
		onSurikenCard,
		onHeartCard,

		isCleared,
		level,
		surikenCard,
		heartCard,
		isGameAvailable,
		cards,
		submittedCard,
	};

	return (
		<TheMindContext.Provider value={value}>
			{children}
		</TheMindContext.Provider>
	);
};

export const TheMindContext = createContext<States | undefined>(undefined!);

export const useTheMindContext = () => useContext(TheMindContext);
