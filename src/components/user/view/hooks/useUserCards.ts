import { useCallback } from "react";
import { useSocketContext } from "../../../container/socket/SocketProvider.tsx";

export const useUserCards = () => {
    const {onSubmit, cards, removeCard} = useSocketContext()!;

    const onClick = useCallback((cardNumber: number)=>{
        removeCard(cardNumber);
        onSubmit(cardNumber)
    }, [removeCard, onSubmit])

    return {
        cards,
        onClick
    }
}