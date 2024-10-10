import classNames from "classnames";
import s from "./character.module.scss";
import { ChaoChaoPlayerColors } from "../../types/ChaoChaoPlayer";

interface Props {
	color: ChaoChaoPlayerColors;
}

export const Character = (props: Props) => {
	const { color } = props;

	return <div className={classNames(s.character, s[color])} />;
};
