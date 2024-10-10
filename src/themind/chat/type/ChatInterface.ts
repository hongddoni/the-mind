export interface ChatMessage {
    id: number;
    sender: string;
    message: string;
    timeStamp: string;
}

export interface ChatHistory {
    roomId: number;
    messages: ChatMessage[];
}