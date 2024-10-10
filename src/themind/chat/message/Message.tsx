import {ChatMessage} from "../type/ChatInterface.ts";
import s from "./message.module.scss";

interface Props {
    chat: ChatMessage;
}

export const Message = (props: Props) => {
    const {chat} = props;
    return (
        <div className={s.message} data-is-owner={chat.id === 1}>
            <span>{chat.message}</span>

        </div>
    )
}