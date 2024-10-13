import { ChaoChaoBoard } from "./board/ChaoChaoBoard";
import {ChaoChaoProvider} from "./ChaoChaoProvider.tsx";

export const ChaoChao = () => {
	return (
		<ChaoChaoProvider>
			<ChaoChaoBoard />
		</ChaoChaoProvider>
	);
};
