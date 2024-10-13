import classNames from "classnames";
import s from "./character.module.scss";
import { ChaoChaoColors } from "../../types/ChaoChaoPlayer";

interface Props {
	color: ChaoChaoColors;
}

export const Character = (props: Props) => {
	const { color } = props;

	return <div className={classNames(s.character, s[color])} />;
};
