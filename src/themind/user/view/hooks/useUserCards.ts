import { useCallback, useMemo } from "react";
import { useTheMindContext } from "../../../container/socket/TheMindProvider.tsx";

export const useUserCards = () => {
	const { onSubmit, cards, removeCard } = useTheMindContext()!;

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
