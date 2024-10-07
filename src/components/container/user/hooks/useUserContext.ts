import {useContext} from "react";
import {UserContainerContext} from "../context/UserContainerProvider.tsx";

export const useUserContext = () => {
    return useContext(UserContainerContext);
}