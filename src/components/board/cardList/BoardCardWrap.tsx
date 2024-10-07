import React, { forwardRef } from "react";
import s from "./boardCardWrap.module.scss";

interface Props {
	zIndex: number;
	x: number;
	y: number;
}

export const BoardCardWrap: React.FC<React.PropsWithChildren<Props>> =
	forwardRef((props, ref) => {
		const { zIndex, children, x, y } = props;
		return (
			<div
				className={s.cardWrap}
				style={{ zIndex, left: x, top: y }}
				ref={ref}
			>
				{children}
			</div>
		);
	});
