import {SocketProvider} from "./socket/SocketProvider.tsx";
import {GameSelector} from "./GameSelector.tsx";

function App() {
	return (
		<SocketProvider>
			<GameSelector/>
		</SocketProvider>
	);
}

export default App;
