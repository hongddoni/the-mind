import {createContext, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {GameType} from "../type/gameType.ts";
import {User} from "../themind/types/User.ts";

interface Props {
    children: React.ReactNode;
}

interface States {
    socket: Socket | null;
    gameType: GameType | null;
    setGameType: (gameType: GameType) => void;

    users: User[];

    nickname: string;
    setNickname: (value: string) => void;
    joinGame: (gameType: GameType) => void;
}

const SocketContext = createContext<States | undefined>(undefined!);

export const useSocketContext = () => useContext(SocketContext);

const URL = import.meta.env.VITE_API_URL ?? "";
export const SocketProvider = (props: Props) => {
    const {children} = props;
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameType, setGameType] = useState<GameType | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const [nickname, setNickname] = useState<string>("");

    useEffect(() => {
        setSocket(io(URL));
        // 클린업 함수로 컴포넌트 언마운트 시 소켓 연결 해제

        return () => {
            socket?.close();
        };
    }, []);

    useEffect(() => {
        if(!socket) return;

        // 유저가 게임에 참여할 때 플레이어 정보 업데이트
        socket.on("playerJoined", (data: { players: User[] }) => {
            setUsers(data.players);
        });

    }, [socket]);

    const joinGame = (gameType: GameType) => {
        if (socket) {
            setGameType(gameType);
            socket.emit("joinGame", { gameType, nickname });
        }
    };

    const value : States = {
        joinGame,
        socket,
        gameType,
        users,
        setGameType,
        nickname, setNickname
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}