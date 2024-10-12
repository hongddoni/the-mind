import {TheMind} from "./themind/TheMind.tsx";
import {ChaoChao} from "./chaochao/ChaoChao.tsx";
import {useSocketContext} from "./socket/SocketProvider.tsx";
import {Login} from "./themind/login/Login.tsx";
import {useState} from "react";

export const GameSelector = () => {
    const [open, setOpen] = useState<boolean>(true);
    const {gameType} = useSocketContext()!;

    const gameSelector = () => {
        switch (gameType) {
            case 'theMind' :
                return <TheMind/>
            case 'chaoChao':
                return <ChaoChao/>
            default:
                return null;
        }
    }


    return (
        <div>
            {open && <Login onClose={() => setOpen(false)} />}
            {gameSelector()}
        </div>
    )
}