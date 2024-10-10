import { useState } from "react";
import { SocketProvider } from "./container/socket/SocketProvider";
import { MainContainer } from "./container/main/MainContainer";
import { Login } from "./login/Login";
import { Dashboard } from "./dashboard/Dashboard";
import { BoardContainer } from "./container/board/BoardContainer";
import { BoardCardList } from "./board/cardList/BoardCardList";
import { User } from "./user/view/User";
import { GameOverModal } from "./modal/GameOverModal";

export const TheMind = () => {
	const [open, setOpen] = useState<boolean>(true);
	return (
		<SocketProvider>
			<MainContainer>
				{open && <Login onClose={() => setOpen(false)} />}
				<Dashboard />
				<BoardContainer>
					<BoardCardList />
				</BoardContainer>
				<User />
				{/* <ChatButton /> */}
				<GameOverModal />
			</MainContainer>
		</SocketProvider>
	);
};
