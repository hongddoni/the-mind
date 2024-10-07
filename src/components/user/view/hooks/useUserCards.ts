import { useCallback, useMemo } from "react";
import { useSocketContext } from "../../../container/socket/SocketProvider.tsx";

export const useUserCards = () => {
	const { onSubmit, cards, removeCard } = useSocketContext()!;
	// const cards = [2234, 5, 165, 36, 26, 262, 6, 2];

	const onClick = useCallback(
		(cardNumber: number) => {
			removeCard(cardNumber);
			onSubmit(cardNumber);
		},
		[removeCard, onSubmit]
	);

	const minimumNumber = useMemo(() => {
		return cards.reduce((acc, cur) => {
			return cur < acc ? cur : acc;
		}, Infinity);
	}, [cards]);

	return {
		cards,
		onClick,
		minimumNumber,
	};
};
