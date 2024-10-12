import { TheMindProvider } from "./container/socket/TheMindProvider.tsx";
import { MainContainer } from "./container/main/MainContainer";
import { Dashboard } from "./dashboard/Dashboard";
import { BoardContainer } from "./container/board/BoardContainer";
import { BoardCardList } from "./board/cardList/BoardCardList";
import { User } from "./user/view/User";
import { GameOverModal } from "./modal/GameOverModal";

export const TheMind = () => {
	return (
		<TheMindProvider>
			<MainContainer>
				<Dashboard />
				<BoardContainer>
					<BoardCardList />
				</BoardContainer>
				<User />
				{/* <ChatButton /> */}
				<GameOverModal />
			</MainContainer>
		</TheMindProvider>
	);
};
