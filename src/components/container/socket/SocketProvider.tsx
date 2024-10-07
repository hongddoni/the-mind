import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "../../types/User";

interface States {
	joinGame: () => void;
	endGame: () => void;
	onReady: () => void;
	onSubmit: (cardNumber: number) => void;
	removeCard: (cardNumber: number) => void;
	onRestart: () => void;
	onSurikenCard: () => void;
	onHeartCard: () => void;

	nickname: string;
	setNickname: (value: string) => void;

	isCleared: boolean;
	users: User[];
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

const URL = "http://localhost:3000";

export const SocketProvider = (props: Props) => {
	const { children } = props;
	const [nickname, setNickname] = useState<string>("");
	const [socket, setSocket] = useState<Socket | null>(null);
	const [users, setUsers] = useState<User[]>([]);
	const gameType = "default";

	const [cards, setCards] = useState<number[]>([]);
	const [submittedCard, setSubmittedCard] = useState<number[]>([]);

	const [surikenCard, setSurikenCard] = useState(0);
	const [heartCard, setHeartCard] = useState(0);
	const [level, setLevel] = useState(0);
	const [isGameAvailable, setIsGameAvailable] = useState(false);

	const [isCleared, setIsCleared] = useState(false);

	// 소켓 연결과 이벤트 핸들러 설정
	useEffect(() => {
		const newSocket = io(URL);
		setSocket(newSocket);

		// 제출된 카드 상태 업데이트
		newSocket.on(
			"submittedCardsUpdated",
			(data: { submittedCard: number[] }) => {
				setSubmittedCard(data.submittedCard); // 실시간으로 상태 업데이트
			}
		);

		// 유저가 게임에 참여할 때 플레이어 정보 업데이트
		newSocket.on("playerJoined", (data: { players: User[] }) => {
			setUsers(data.players);
		});

		// 룰 정보 업데이트
		newSocket.on("ruleInfo", (data: Rule) => {
			setSurikenCard(data.suriken);
			setHeartCard(data.heart);
			setLevel(data.level);
		});

		// 게임이 시작될 때의 상태 업데이트
		newSocket.on(
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
		newSocket.on("levelUp", (data: { level: number; cards: number[] }) => {
			setLevel(data.level); // 서버에서 전송된 새로운 레벨로 업데이트
			setCards(data.cards); // 새롭게 부여된 카드 업데이트
			setSubmittedCard([]); // 레벨업 시 제출된 카드 초기화
		});

		newSocket.on("surikenDecreased", (data: { suriken: number }) => {
			setSurikenCard(data.suriken);
		});

		newSocket.on("heartDecreased", (data: { heart: number }) => {
			setHeartCard(data.heart);
		});

		newSocket.on("gameEnded", () => {
			setSubmittedCard([]);
			setIsGameAvailable(false);
			setCards([]);
		});

		newSocket.on(
			"gameRestarted",
			(data: { gameType: string; rule: Rule; cards: number[] }) => {
				setIsGameAvailable(true);
				setLevel(data.rule.level);
				setSurikenCard(data.rule.suriken);
				setHeartCard(data.rule.heart);
				setSubmittedCard([]); // 게임이 재시작될 때 submittedCard 초기화
			}
		);

		newSocket.on("userCards", (data: { userCards: number[] }) => {
			setCards(data.userCards);
		});

		newSocket.on("isCleared", () => {
			setIsCleared(true);
		});

		// 클린업 함수로 컴포넌트 언마운트 시 소켓 연결 해제
		return () => {
			newSocket.close();
		};
	}, []);

	// 게임 참가
	const joinGame = () => {
		if (socket) {
			socket.emit("joinGame", { gameType, nickname });
		}
	};

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
		joinGame,
		endGame,
		onReady,
		onSubmit,
		removeCard,
		onRestart,
		onSurikenCard,
		onHeartCard,

		isCleared,
		users,
		nickname,
		setNickname,
		level,
		surikenCard,
		heartCard,
		isGameAvailable,
		cards,
		submittedCard,
	};

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};

export const SocketContext = createContext<States | undefined>(undefined!);

export const useSocketContext = () => useContext(SocketContext);
