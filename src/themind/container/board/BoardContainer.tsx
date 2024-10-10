import React from "react";
import s from "./boardContainer.module.scss";

interface Props {
}

export const BoardContainer: React.FC<React.PropsWithChildren<Props>> = props => {
    return (
        <div className={s.board}>
            {props.children}
        </div>
    );
};
