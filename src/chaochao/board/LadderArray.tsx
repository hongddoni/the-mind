import { useChaChaoContext } from "../ChaoChaoProvider";
import { Character } from "./character/Character";
import s from "./ladderArray.module.scss";

interface Props {
	ladderLevel: number;
}

export const LadderArray = (props: Props) => {
	const context = useChaChaoContext()!;
	const { ladderLevel } = props;

	return (
		<div className={s.ladder}>
			{context.players.map((p) =>
				p.characters.map((c) => {
					if (
						c.status === "playing" &&
						c.ladderLevel === ladderLevel
					) {
						return <Character color={p.color} />;
					}
					return null;
				})
			)}
		</div>
	);
};
