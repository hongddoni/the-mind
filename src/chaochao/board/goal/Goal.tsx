import { useChaoChaoContext } from "../../ChaoChaoProvider";
import { Character } from "../character/Character";
import s from "./goal.module.scss";

interface Props {
	level: number;
}

export const Goal = (props: Props) => {
	const { level } = props;
	const context = useChaoChaoContext()!;

	return (
		<div className={s.goal}>
			<span>{level}</span>
			<div className={s.character}>
				{context.players.map((p) => {
					const findCharacter = p.characters.find((c) => {
						return (
							c.status === "complete" && c.completeLevel === level
						);
					});

					if (findCharacter) {
						return <Character color={p.color} />;
					}
				})}
			</div>
		</div>
	);
};
