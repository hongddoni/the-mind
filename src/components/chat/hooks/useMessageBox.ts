import { useEffect, useState } from "react";
import { ChatHistory } from "../type/ChatInterface.ts";

const roomId = 1;
export const useMessageBox = () => {
	const [messages, setMessages] = useState<ChatHistory | null>(null);
	const loadSessionStorage = () => {
		const chatStorage = sessionStorage.getItem(String(roomId));

		if (chatStorage) {
			return JSON.parse(chatStorage);
		}

		return [];
	};

	useEffect(() => {
		setMessages(loadSessionStorage());
	}, []);

	return {
		messages,
	};
};
