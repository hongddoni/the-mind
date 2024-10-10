import {useEffect, useRef, useState} from "react";
import {Pos} from "../../chat/type/Pos.ts";
import { useSocketContext } from "../../container/socket/SocketProvider.tsx";

export const useBoardCardList = () => {
    const {submittedCard} = useSocketContext()!
    const ref = useRef<HTMLDivElement>(null);
    const [leftTop, setLeftTop] = useState<Pos>({x: 0, y: 0});
    const [rightBottom, setRightBottom] = useState<Pos>({x: 0, y: 0});
    const maxWidth = rightBottom.x - leftTop.x;

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setLeftTop({x: rect.left, y: rect.top});
            setRightBottom( { x: rect.right, y: rect.bottom });
        }
    }, []);

    return {
        cards: submittedCard,
        ref,
        maxWidth
    }
}