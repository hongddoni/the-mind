import {useState} from "react";
import {ChatHistory, ChatMessage} from "../type/ChatInterface.ts";

export const useChatBoxInput = () => {
    const roomId = 1;
    const [value, setValue] = useState('');

    const onSendClick = () => {
        setValue('');

        const newMessage: ChatMessage = {
            id: 1,
            sender: 'dummy',
            message: value,
            timeStamp: new Date().toISOString()
        }

        putSessionStorage(newMessage);
    };

    const putSessionStorage = (newMessage: ChatMessage) => {
        const chatStorage = sessionStorage.getItem(roomId);
        let chatHistory: ChatHistory;
        if (chatStorage) {
            chatHistory = JSON.parse(chatStorage);
        } else {
            chatHistory = {roomId, messages: []}
        }

        chatHistory.messages.push(newMessage);

        sessionStorage.setItem(roomId, JSON.stringify(chatHistory));
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSendClick();
        }
    };

    const onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    return {
        onChange,
        onKeyDown,
        onSendClick,
        value,
    }
}