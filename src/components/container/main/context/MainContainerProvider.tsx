import { createContext, useCallback } from "react";
import { useMainInitialize } from "../hooks/useMainInitialize.ts";
import { MainContainer } from "../MainContainer.tsx";
import { useSocketContext } from "../../socket/SocketProvider.tsx";

interface States {
	cards: number[];
	addCard: (card: number) => void;

	gameStart: () => void;
	gameOver: () => void;
}

interface Props {
	children: React.ReactNode;
}

export const MainContainerProvider = (props: Props) => {
	const { cards, setCards } = useMainInitialize();

	const { startGame, endGame } = useSocketContext()!;

	const gameStart = useCallback(() => {
		startGame();
	}, [startGame]);

	const gameOver = useCallback(() => {
		endGame();
	}, [endGame]);

	const addCard = useCallback(
		(submittedCard: number) => {
			const isCardLowerCards = cards.find((v) => v > submittedCard);

			// if (isCardLowerCards) {
			// 	if (heartCard > 0) {
			// 		setHeartCard(heartCard - 1);
			// 	} else {
			// 		gameOver();
			// 		return;
			// 	}
			// }

			setCards([...cards, submittedCard]);
		},
		[cards, setCards]
	);

	const value: States = {
		cards,
		addCard,

		gameStart,
		gameOver,
	};

	return (
		<MainContainerContext.Provider value={value}>
			<MainContainer>{props.children}</MainContainer>
		</MainContainerContext.Provider>
	);
};

export const MainContainerContext = createContext<States | undefined>(
	undefined!
);
