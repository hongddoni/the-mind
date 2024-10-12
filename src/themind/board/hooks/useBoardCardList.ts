import {useRef} from "react";
import { useTheMindContext } from "../../container/socket/TheMindProvider.tsx";

export const useBoardCardList = () => {
    const {submittedCard} = useTheMindContext()!
    const ref = useRef<HTMLDivElement | null>(null);

    return {
        cards: submittedCard,
        ref,
    }
}