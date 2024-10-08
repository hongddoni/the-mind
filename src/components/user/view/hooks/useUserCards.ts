import { useCallback, useMemo } from "react";
import { useSocketContext } from "../../../container/socket/SocketProvider.tsx";

export const useUserCards = () => {
	const { onSubmit, cards, removeCard } = useSocketContext()!;

	const onClick = useCallback(
		(cardNumber: number) => {
			removeCard(cardNumber);
			onSubmit(cardNumber);
		},
		[removeCard, onSubmit]
	);

	const minimumNumber = useMemo(() => {
		const minimum = cards.reduce((acc, cur) => {
			return cur < acc ? cur : acc;
		}, Infinity);
		return minimum === Infinity ? 0 : minimum;
	}, [cards]);

	return {
		cards,
		onClick,
		minimumNumber,
	};
};
