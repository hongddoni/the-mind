import React from "react";
import s from "./label.module.scss";
import classNames from "classnames";

interface Props {
    children: React.ReactNode;
    block?: boolean;
}

export const Label = (props: Props) => {
    const {children, block} = props;
    return (
        <div className={classNames(s.label, block && s.block)}>{children}</div>
    )
}