import React, {createContext, useCallback, useState} from "react";

interface State {
    cards: number[];
    addCard: (cards: number) => void;
    removeCard: (card: number) => void;
}

interface Props {
}

export const UserContainerProvider: React.FC<React.PropsWithChildren<Props>> = props => {
    const [cards, setCards] = useState<number[]>([1,3,5,6,100]);

    const addCard = useCallback((card: number) => {
        setCards([...cards, card]);
    }, [cards]);

    const removeCard = useCallback((card: number) => {
        setCards(cards.filter(c => c !== card));
    }, [cards]);

    return (
        <UserContainerContext.Provider value={{cards, addCard, removeCard}}>
            {props.children}
        </UserContainerContext.Provider>
    );
};

export const UserContainerContext = createContext<State | undefined>(undefined!);
