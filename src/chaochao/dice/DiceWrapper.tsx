import { useState } from "react";
import Dice from "./Dice";
import s from "./diceWrapper.module.scss";

export const DiceWrapper = () => {
	const [triggerRoll, setTriggerRoll] = useState(false);
	const [result, setResult] = useState<string | null>(null);

	// 주사위를 굴리는 함수
	const rollDice = () => {
		setResult(null); // 결과 초기화
		setTriggerRoll(true);

		// 주사위 굴림 후 트리거 초기화
		setTimeout(() => {
			setTriggerRoll(false);
		}, 2100); // 주사위 애니메이션 시간이 2초이므로 약간의 여유를 둠
	};

	const onRollEnd = (result: string) => {
		setResult(result);
		setTriggerRoll(false);
	};
	return (
		<div className={s.wrapper}>
			<div className={s.dice}>
				<Dice triggerRoll={triggerRoll} onRollEnd={onRollEnd} />
				{
					<button className={s.rollButton} onClick={rollDice}>
						Roll
					</button>
				}
				{result && <span className={s.result}>result: {result}</span>}
			</div>
		</div>
	);
};
