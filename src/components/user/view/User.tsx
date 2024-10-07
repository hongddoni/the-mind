import { UserContainer } from "../../container/user/UserContainer.tsx";
import { UserContainerProvider } from "../../container/user/context/UserContainerProvider.tsx";
import { UserCardList } from "./card/UserCardList.tsx";

export const User = () => {
	return (
		<UserContainerProvider>
			<UserContainer>
				<UserCardList />
			</UserContainer>
		</UserContainerProvider>
	);
};
