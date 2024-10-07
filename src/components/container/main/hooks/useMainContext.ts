import {useContext} from "react";
import {MainContainerContext} from "../context/MainContainerProvider.tsx";

export const useMainContext = () => {
    return useContext(MainContainerContext);
}