import { ChaoChaoBoard } from "./board/ChaoChaoBoard";
import {ChaoChaoProvier} from "./ChaoChaoProvider.tsx";

export const ChaoChao = () => {
	return (
		<ChaoChaoProvier>
			<ChaoChaoBoard />
		</ChaoChaoProvier>
	);
};
