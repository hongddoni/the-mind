import { User } from "./components/user/view/User.tsx";
import { BoardContainer } from "./components/container/board/BoardContainer.tsx";
import { BoardCardList } from "./components/board/cardList/BoardCardList.tsx";
import { Dashboard } from "./components/dashboard/Dashboard.tsx";
import { GameOverModal } from "./components/modal/GameOverModal.tsx";
import { SocketProvider } from "./components/container/socket/SocketProvider.tsx";
import { Login } from "./components/login/Login.tsx";
import { useState } from "react";
import { MainContainer } from "./components/container/main/MainContainer.tsx";

function App() {
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
}

export default App;
