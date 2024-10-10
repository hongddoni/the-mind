import React from "react";
import s from "./userContainer.module.scss";

interface Props {
}

export const UserContainer: React.FC<React.PropsWithChildren<Props>> =props => {
    return (
        <div className={s.user}>
            {props.children}
        </div>
    );
};
