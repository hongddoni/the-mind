import React from "react";
import s from "./mainContainer.module.scss";

interface Props {

}

export const MainContainer: React.FC<React.PropsWithChildren<Props>> = props => {
    return (
        <div className={s.main}>
            {props.children}
        </div>
    );
};
