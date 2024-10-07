import {useState} from "react";

export const useMainInitialize = () => {
    const [cards, setCards] = useState<number[]>([]);

    return {
        cards,
        setCards
    }
}