import s from "./messageBox.module.scss";
import {Message} from "./Message.tsx";
import {useMessageBox} from "../hooks/useMessageBox.ts";

export const MessageBox = () => {
    const {messages} = useMessageBox();

    if(!messages || !messages.messages) return null;

    return (
        <div className={s.messageBox}>
            {
                messages?.messages.map(message => <Message chat={message}/>)
            }
        </div>
    )
}
