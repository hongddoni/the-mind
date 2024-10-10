import s from "./chatBox.module.scss";
import {ChatBoxInput} from "./ChatBoxInput.tsx";
import {MessageBox} from "../message/MessageBox.tsx";

export const ChatBox = () => {
    return (
        <div className={s.chatBox}>
            <MessageBox/>
            <ChatBoxInput/>
        </div>
    )
}