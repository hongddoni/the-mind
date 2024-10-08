import classNames from "classnames";
import s from "./card.module.scss";

interface Props {
	number: number;
	onClick?: (cardNumber: number) => void;
	hightLight?: boolean;
}

export const Card = (props: Props) => {
	const { number, onClick, hightLight } = props;

	return (
		<div
			className={classNames(s.card, hightLight && s.hightlight)}
			role={"button"}
			onClick={() => onClick?.(number)}
		>
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
		</div>
	);
};
