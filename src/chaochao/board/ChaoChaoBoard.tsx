import s from "./chaoChaoBoard.module.scss";
import { useState } from "react";
import { DiceWrapper } from "../dice/DiceWrapper";
import { LadderArray } from "./LadderArray";
import { Character } from "./character/Character";
import { useChaChaoContext } from "../ChaoChaoProvider";
import { Goal } from "./goal/Goal";

export const ChaoChaoBoard = () => {
	const context = useChaChaoContext()!;
	const [diceOpen, setDiceOpen] = useState<boolean>(false);

	const goalArray = Array.from({ length: 10 }).map(
		(_, i) => `goal children ${i}`
	);

	const ladderArray = Array.from({ length: 7 }).map(
		(_, i) => `ladder children ${i}`
	);

	return (
		<div className={s.board}>
			<div className={s.dice}>
				<button
					className={s.rollingButton}
					onClick={() => setDiceOpen(true)}
				>
					주사위
				</button>
			</div>
			<div className={s.goal}>
				{goalArray.map((_, i) => (
					<Goal level={i + 1} />
				))}
			</div>
			<div className={s.ladder}>
				{ladderArray.map((v, idx) => (
					<LadderArray key={v} ladderLevel={idx + 1} />
				))}
			</div>
			<div className={s.waitingLine}>
				{context.players.map((v) => (
					<div key={v.nickname} className={s.characterWrap}>
						{v.characters.map((c) => {
							if (c.status === "wating") {
								return <Character color={v.color} />;
							}
						})}
					</div>
				))}
			</div>
			{diceOpen && <DiceWrapper />}
		</div>
	);
};
