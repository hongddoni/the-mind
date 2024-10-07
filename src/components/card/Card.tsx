import s from "./card.module.scss";
import { useReducer } from "react";

interface Props {
	number: number;
	onClick?: (cardNumber: number) => void;
}

export const Card = (props: Props) => {
	const { number, onClick } = props;
	const [flip, setFlip] = useReducer((v) => !v);

	const renderer = () => {
		if (flip) {
			return (
				<div>
					<span>Front</span>
				</div>
			);
		}

		return (
			<div className={s.back}>
				<div className={s.top}>
					<span>{number}</span>
					<span>{number}</span>
				</div>
				<div className={s.middle}>
					<span>{number}</span>
				</div>
				<div className={s.bottom}>
					<span>{number}</span>
					<span>{number}</span>
				</div>
			</div>
		);
	};

	return (
		<div
			className={s.card}
			role={"button"}
			onClick={() => onClick?.(number)}
		>
			{renderer()}
		</div>
	);
};
