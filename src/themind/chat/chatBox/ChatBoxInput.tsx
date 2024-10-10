import s from "./ChatBoxInput.module.scss";
import {useChatBoxInput} from "../hooks/useChatBoxInput.ts";

export const ChatBoxInput = () => {
    const {onSendClick, onKeyDown, onChange, value} = useChatBoxInput();

    return (
        <div className={s.input}>
            <input value={value} onKeyDown={onKeyDown} onChange={onChange}/>
            <button className={s.button} onClick={onSendClick}>Send</button>
        </div>
    )
}