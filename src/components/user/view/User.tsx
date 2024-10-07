import { UserContainer } from "../../container/user/UserContainer.tsx";
import { UserCardList } from "./card/UserCardList.tsx";

export const User = () => {
	return (
		<UserContainer>
			<UserCardList />
		</UserContainer>
	);
};
