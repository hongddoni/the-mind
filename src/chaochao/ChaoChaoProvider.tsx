import React, {createContext, useContext, useEffect, useState} from "react";
import {ChaoChaoGame, ChaoChaoPlayer, ChaoChaoRule, GameStatus} from "./types/ChaoChaoPlayer";
import {useSocketContext} from "../socket/SocketProvider.tsx";

interface Props {
    children: React.ReactNode;
}

interface States {
    players: ChaoChaoPlayer[];
    onReady: () => void;
    rollTheDice: () => void;
    onLieClick: () => void;
    onTrueClick: () => void;

    onDiceSubmit: (result: string, value: string) => void;
    gameStatus: GameStatus;

    rule: ChaoChaoRule | null;
}

const ChaoChaoContext = createContext<States | undefined>(undefined!);

export const useChaoChaoContext = () => useContext(ChaoChaoContext);

export const ChaoChaoProvider = (props: Props) => {
    const {children} = props;
    const {socket} = useSocketContext()!;
    const [players, setPlayers] = useState<ChaoChaoPlayer[]>([]);
    const [rule, setRule] = useState<ChaoChaoRule | null>(null);
    const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');

    useEffect(() => {
        if (!socket) return;

        socket.on("chaoChaoStatusUpdated", (data: ChaoChaoGame) => {
            setPlayers(data.players);
            setRule(data.rule);
            setGameStatus(gameStatus);
        });
    }, [socket]);

    const onReady = () => {
        if (socket) {
            socket.emit('setChaoChaoPlayerReady');
            socket.on("chaoChaoStatusUpdated", (data: ChaoChaoGame) => {
                setPlayers(data.players);
                setRule(data.rule);
                setGameStatus('playing');
            });
        }
    }

    const rollTheDice = () => {
        if (socket) {
            socket.emit('rollTheDice');
        }
    }

    const onTrueClick = () => {
        if (socket) {
            socket.emit('judgeTrue', {userId: socket.id});
        }
    }

    const onLieClick = () => {
        if (socket) {
            socket.emit('judgeLie', {userId: socket.id});
        }
    }

    const onDiceSubmit = (realValue: string, submitValue: string) => {
        if (socket) {
            socket.emit('submitDice', ({userId: socket.id, realValue, submitValue}));
        }
    }

    const value = {
        players,
        onReady,
        onLieClick,
        onTrueClick,
        rollTheDice,
        onDiceSubmit,
        gameStatus,
        rule
    };

    return (
        <ChaoChaoContext.Provider value={value}>
            {children}
        </ChaoChaoContext.Provider>
    );
};
