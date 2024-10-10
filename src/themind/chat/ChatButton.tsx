import s from "./chatButton.module.scss";
import { ChatBox } from "./chatBox/ChatBox.tsx";
import { useState } from "react";

export const ChatButton = () => {
	// const [open, setOpen] = useReducer(v => !v);
	const [open, setOpen] = useState(true);
	return (
		<div className={s.chatButton} onClick={() => setOpen(true)}>
			{open && <ChatBox />}
		</div>
	);
};
